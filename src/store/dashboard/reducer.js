import {
  CONTENT,
} from '../../constants/ActionTypes';

import initialState from './initialState';
 const reducer = (state = initialState, action) => {
  switch(action.type) {
    case CONTENT
      const contentCopy = state.content.slice(0);
      contentCopy.push(action.content);
      return Object.assign({}, state, {
        content: contentCopy,
      });
    default:
      return state;
  }
}

export default reducer;
