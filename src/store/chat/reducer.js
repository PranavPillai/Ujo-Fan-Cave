import {
  MESSAGE,
} from '../../constants/ActionTypes';
import initialState from './initialState';

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case MESSAGE:
      const messagesCopy = state.messages
      messagesCopy.push(action.message)
      return Object.assign({}, state, {
        messages: messagesCopy
      });
    default:
      return state;
  }
}

export default reducer;
