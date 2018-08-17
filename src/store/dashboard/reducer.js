import {
  POST_CONTENT,
  CLEAR_CONTENT,
} from '../../constants/ActionTypes';

import initialState from './initialState';
 const reducer = (state = initialState, action) => {
  switch(action.type) {
    case POST_CONTENT:
      const contentCopy = state.content.slice(0);
      contentCopy.push(action.content);
      return Object.assign({}, state, {
        content: contentCopy,
      });
    case CLEAR_CONTENT: {
      return Object.assign({}, state, {
        content: [],
      });
    }
    default:
      return state;
  }
}

export default reducer;
