import numpy as np
import matplotlib.pyplot as plt
from Levenshtein import distance as levenshtein_distance
import cv2
import mediapipe as mp
import imageio
from statsmodels.tsa.arima_model import ARIMA
from datetime import datetime


def score(expected_list : list, reality_list : str):
    """The score that will be displayed to the patient.

    Args:
        expected_list (_type_): list of actions the practitioner asked for.
        reality_list (_type_): list of actions the patient actually performed.
    """
    sub_expected_list = expected_list[: len(reality_list)]
    dist = levenshtein_distance(sub_expected_list,reality_list)
    score = 10*(len(reality_list) - dist)
    return score

def speed_last_trip(df: pd.DataFrame):
    """The speed the patient took to proceed to the last trip.

    Args:
        df (pd.DataFrame): dataframe with tag id, city it corresponds to, timestamp of the action.
    """
    d = {}
    last_row = df.iloc[-1]
    before_last_row = df.iloc[-2]
    d['speed'] = last_row['timestamp'] - before_last_row['timestamp']
    d['trip'] = f"{last_row['city']}_{last_row['city']}"
    return d

def time_elapsed(df: pd.DataFrame):
    """The time elapsed between the beginning and ending of the session.

    Args:
        df (pd.DataFrame): dataframe with tag id, city it corresponds to, timestamp of the action.
    """
    first_row = df.iloc[1]
    last_row = df.iloc[-1]
    elapsed = last_row['timestamp'] - first_row['timestamp']
    return elapsed

def mean_speed(df: pd.DataFrame):
    """The speed meaned over the session.

    Args:
        df (pd.DataFrame): dataframe with tag id, city it corresponds to, timestamp of the action.
    """
    speeds = list(df['timestamp'].diff())[1:]
    return np.mean(speeds)

def evolution_score_and_forecast(df: pd.DataFrame, steps : int) -> None:
    """Plots the evolution of the score (between 0 and 100%) over the sessions.

    Args:
        df (pd.DataFrame): dataframe with session_id, tag_id, city it corresponds to, expected_actions.
        steps : number of iterations to predict on.
    """
    df_evolution = df.groupby(['session_id']).apply(
    lambda x: 
    (len(x['tag_id']) - levenshtein_distance(''.join(x['tag_id']), ''.join(x['expected_actions'].values[0]))) / 
    x['tag_id'].count()).to_frame()
    model = ARIMA(df_evolution, order=(1,1,1))
    results = model.fit()
    results.plot_predict(start = df['session_id'].min(), end = df['session_id'].max() + steps, dynamic=False)
    plt.show()

def human_pose_estimation(video_name = 'video.mp4') -> None:
    """Video modified with the detected landmarks/key-points within the region of interest.
    Args:
        video_name (str, optional): name of the video file. Defaults to 'video.mp4'.
    """
    # initialize Pose estimator
    mp_drawing = mp.solutions.drawing_utils
    mp_pose = mp.solutions.pose
    pose = mp_pose.Pose(
        min_detection_confidence=0.5,
        min_tracking_confidence=0.5)

    # create capture object
    cap = cv2.VideoCapture(video_name)
    frames = []
    while cap.isOpened():
    # read frame from capture object
    _, frame = cap.read()
    try : 
        # convert the frame to RGB format
        RGB = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        # process the RGB frame to get the result
        results = pose.process(RGB)
        # draw detected skeleton on the frame
        mp_drawing.draw_landmarks(frame, results.pose_landmarks, mp_pose.POSE_CONNECTIONS)
        frames.append(frame)
    except:
        break
    cap.release()
    cv2.destroyAllWindows()

    with imageio.get_writer('movie2.gif', mode='I') as writer:
        for frame in frames:
            writer.append_data(frame)
