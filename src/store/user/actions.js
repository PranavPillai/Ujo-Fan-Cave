import {
  GET_PERSONA_REQUEST,
  GET_PERSONA_SUCCESS,
  GET_PERSONA_FAILURE,
} from '../../constants/ActionTypes';
import axios from 'axios';
import { API_ENDPOINT } from '../../constants/endPoints';

export const fetchUser = (ethereumaddress) => async dispatch => {
  dispatch({type: GET_PERSONA_REQUEST});
  try {
    const {data} = 
      await axios.get(`${API_ENDPOINT}/persons?ethereumAddress=${ethereumaddress}`);
      dispatch({
        type: GET_PERSONA_SUCCESS, user: data[0]
      });
  } catch (err) {
    dispatch({type: GET_PERSONA_FAILURE, err});
  }
}
