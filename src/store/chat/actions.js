import firebase from '../../config/firebase';
import {
  MESSAGE,
  CLEAR_MESSAGES,
} from '../../constants/ActionTypes';

export const dispatchMessage = message => ({type: MESSAGE, message});

export const sendMessage = (message, room) => async dispatch => {
  const chatRoomRef = firebase.database().ref(room);
  chatRoomRef.push().set(message);
  dispatch(dispatchMessage(message));
};

export const getMessages = (room) => async dispatch => {
  const chatRoomRef = firebase.database().ref(room);
  chatRoomRef.once('value', (snapshot) => {
    const messages = snapshot.val();
    for(const message in messages) {
      dispatch(dispatchMessage(messages[message]));
    }
  });
}

export const clearMessages = () => async dispatch => {
  dispatch({type: CLEAR_MESSAGES});
}
