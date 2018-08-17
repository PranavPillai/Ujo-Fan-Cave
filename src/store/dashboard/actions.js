import firebase from '../../config/firebase';
import {
  POST_CONTENT,
  CLEAR_CONTENT,
} from '../../constants/ActionTypes';

export const dispatchContent = content => ({type: POST_CONTENT, content});

export const postContent = (content, room) => async dispatch => {
  const dashboardRef = firebase.database().ref(room+'-dashboard');
  dashboardRef.push().set(content);
};

export const clearContent = () => async dispatch => {
  dispatch({type: CLEAR_CONTENT});
}

export const contentListener = (room) => async dispatch => {
  const dashboardRef = firebase.database().ref(room);
  dashboardRef.on('child_added', data => {
    const contentObj = data.val();
    dispatch(dispatchContent(contentObj));
  });
}
