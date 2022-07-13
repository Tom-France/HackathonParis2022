import { idbConnect, TAGS_DATABASE } from "../data";

export const ADD = "ADD";
export const REMOVE = "REMOVE";
export const REQUEST_DB = "REQUEST_DB";
export const RECEIVE_DB = "RECEIVE_DB";

export const add = value => {
  return {
    type: ADD,
    value: value
  };
};

export const remove = id => {
  return {
    type: REMOVE,
    value: id
  };
};

export const requestDB = value => {
  return {
    type: REQUEST_DB
  };
};

export const receiveDB = data => {
  return {
    type: RECEIVE_DB,
    data,
    receivedAT: Date.now()
  };
};

// Meet our first thunk action creator!
// Though its insides are different, you would use it just like any other action creator:
// store.dispatch(fetchData('plants'))
export const fetchData = datatable => {
  return dispatch => {
    dispatch(requestDB());

    idbConnect().then(
      response => {
        console.log("Success!");

        //response is the IDBDatabase Object
        const objectStore = response.transaction(TAGS_DATABASE).objectStore(TAGS_DATABASE);

        const data = [];
        objectStore.openCursor().onsuccess = e => {
          const cursor = e.target.result;
          if (cursor) {
            data.push(cursor.value);
            cursor.continue();
          } else {
            console.log(`Data received: ${data}`);
            //Data is loaded
            dispatch(receiveDB(data));
            response.close();
          }
        };
      },

      reject => {
        console.log(`There was an issue. ${reject}`);
      }
    );
  };
};
