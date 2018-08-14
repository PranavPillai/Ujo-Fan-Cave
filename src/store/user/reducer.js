import {
  GET_PERSONA_REQUEST,
  GET_PERSONA_SUCCESS,
  GET_PERSONA_FAILURE,
} from '../../constants/ActionTypes';

import initialState from './initialState';
 const reducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_PERSONA_REQUEST:
      return Object.assign({}, state, {
        loadingPersona: true,
        personaFailure: false,
        personaSuccess: false,
      });
    case GET_PERSONA_SUCCESS: {
      return Object.assign({}, state, {
        loadingPersona: false,
        personaSuccess: true,
        personaFailure: false,
        user: action.data,
      });
    }
    case GET_PERSONA_FAILURE: {
      return Object.assign({}, state, {
        loadingPersona: false,
        personaSuccess: false,
        personaFailure: true,
      });
    }
    default:
      return state;
  }
}

export default reducer;
