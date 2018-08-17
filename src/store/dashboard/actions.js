import firebase from '../../config/firebase';
import {
  POST_CONTENT,
  SET_ROOM,
} from '../../constants/ActionTypes';

export const dispatchContent = content => ({type: POST_CONTENT, content});

export const postContent = (content, room) => async dispatch => {
  const dashboardRef = firebase.database().ref(room+'-dashboard');
  dashboardRef.push().set(content);
};

export const setDashboardRoom = (room) => async dispatch => {
  dispatch({type: SET_ROOM, room});
  const dashboardRef = firebase.database().ref(room);
  dashboardRef.on('child_added', data => {
    const contentObj = data.val();
    dispatch(dispatchContent(contentObj));
  });
}
