import {
  GET_PERSONA_REQUEST,
  GET_PERSONA_SUCCESS,
  GET_PERSONA_FAILURE,
} from '../../constants/ActionTypes';

export const fetchUser = () => async dispatch => {
  dispatch({type: GET_PERSONA_REQUEST});
  try {
    
  } catch (err) {
    dispatch({type: GET_PERSONA_FAILURE, err});
  }
}
