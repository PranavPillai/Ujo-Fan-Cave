import firebase from '../../config/firebase';
import {
  MESSAGE,
  CLEAR_MESSAGES,
  SET_ROOM,
} from '../../constants/ActionTypes';

export const dispatchMessage = message => ({type: MESSAGE, message});

export const sendMessage = (message, room) => async dispatch => {
  const chatRoomRef = firebase.database().ref(room);
  chatRoomRef.push().set(message);
};

export const clearMessages = () => async dispatch => {
  dispatch({type: CLEAR_MESSAGES});
}

export const setRoom = (room) => async dispatch => {
  dispatch({type: SET_ROOM, room});
  const chatRoomRef = firebase.database().ref(room);
  chatRoomRef.on('child_added', data => {
    const messageObj = data.val();
    dispatch(dispatchMessage(messageObj));
  });
}
