import {
  MESSAGE,
  CLEAR_MESSAGES,
  SET_ROOM,
} from '../../constants/ActionTypes';

import initialState from './initialState';
 const reducer = (state = initialState, action) => {
  switch(action.type) {
    case MESSAGE:
      const messagesCopy = state.messages.slice(0);
      messagesCopy.push(action.message);
      console.log(messagesCopy);
      return Object.assign({}, state, {
        messages: messagesCopy,
      });
    case CLEAR_MESSAGES: {
      return Object.assign({}, state, {
        messages: [],
      });
    }
    case SET_ROOM: {
      return Object.assign({}, state, {
        room: action.room,
      });
    }
    default:
      return state;
  }
}

export default reducer;
