from flask import Flask, request, jsonify, Response
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import queue
import os

app = Flask(__name__)
CORS(app)

if __name__ == '__main__':
    app.run(debug=True)

app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:postgres@db:5432/postgres"
db = SQLAlchemy(app)

class Tag(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  tag_id = db.Column(db.String(80), unique=True, nullable=False)
  tag_name = db.Column(db.String(120), unique=True, nullable=False)

  def __init__(self, tag_id, tag_name):
    self.tag_id = tag_id
    self.tag_name = tag_name

db.create_all()

@app.route('/tags/<id>', methods=['GET'])
def get_tag(id):
  tag = Tag.query.get(id)
  del tag.__dict__['_sa_instance_state']
  return jsonify(tag.__dict__)

@app.route('/tags', methods=['GET'])
def get_tags():
  tags = []
  for tag in db.session.query(Tag).all():
    del tag.__dict__['_sa_instance_state']
    tags.append(tag.__dict__)
  return jsonify(tags)

@app.route('/tags', methods=['POST'])
def create_tag():
  body = request.get_json()
  db.session.add(Tag(body['tag_id'], body['tag_name']))
  db.session.commit()
  return "tag created"

@app.route('/tags/<id>', methods=['PUT'])
def update_tag(id):
  body = request.get_json()
  db.session.query(Tag).filter_by(id=id).update(
    dict(tag_id=body['tag_id'], tag_name=body['tag_name']))
  db.session.commit()
  return "tag updated"

@app.route('/tags/<id>', methods=['DELETE'])
def delete_tag(id):
  db.session.query(Tag).filter_by(id=id).delete()
  db.session.commit()
  return "tag deleted"

class MessageAnnouncer:

    def __init__(self):
        self.listeners = []

    def listen(self):
        self.listeners.append(queue.Queue(maxsize=5))
        return self.listeners[-1]

    def announce(self, msg):
        # We go in reverse order because we might have to delete an element, which will shift the
        # indices backward
        for i in reversed(range(len(self.listeners))):
            try:
                self.listeners[i].put_nowait(msg)
            except queue.Full:
                del self.listeners[i]


announcer = MessageAnnouncer()


def format_sse(data: str, event=None) -> str:
    """Formats a string and an event name in order to follow the event stream convention.
    >>> format_sse(data=json.dumps({'abc': 123}), event='Jackson 5')
    'event: Jackson 5\\ndata: {"abc": 123}\\n\\n'
    """
    msg = f'data: {data}\n\n'
    if event is not None:
        msg = f'event: {event}\n{msg}'
    return msg


@app.route('/reader/<id>', methods=['GET'])
def reader(id):
    msg = format_sse(data=id)
    announcer.announce(msg=msg)
    return {}, 200


@app.route('/listen', methods=['GET'])
def listen():

    def stream():
        messages = announcer.listen()  # returns a queue.Queue
        while True:
            msg = messages.get()  # blocks until a new message arrives
            yield msg
    response =  Response(stream(), mimetype='text/event-stream')
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response