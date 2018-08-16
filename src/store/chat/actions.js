import firebase from '../../config/firebase';
import {
  MESSAGE,
  CLEAR_MESSAGES,
  SET_ROOM,
} from '../../constants/ActionTypes';
//import crystal_good from '../../assets/crystal_good.jpg';

export const dispatchMessage = message => ({type: MESSAGE, message});

export const sendMessage = (message, room) => async dispatch => {
  const chatRoomRef = firebase.database().ref(room);
  const chatRoomStorageRef = firebase.storage().ref(room);
  if (message.image) {
    const f = new File([''], '../../assets/crystal_good.jpg', {type: "image/jpg"});
    const uploadTask = await chatRoomStorageRef.child('images/').put(f);
    const url = await uploadTask.ref.getDownloadURL();
    chatRoomRef.push().set(url);
  } else {
    chatRoomRef.push().set(message);
  }
}

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
