import {
  GET_ACCOUNT,
  GOT_CONTRACT,
  LOADING_CONTRACT,
  GET_NETWORK,
  GET_WEB3,
} from '../../constants/ActionTypes';
import initialState from './initialState';

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_ACCOUNT: 
      return Object.assign({}, state, {
        account: action.account
      });
    case GOT_CONTRACT:
      return Object.assign({}, state, {
        contract: action.contract
      });
    case LOADING_CONTRACT:
      return Object.assign({}, state, {
        contract: action.contract
      });
    case GET_NETWORK:
      return Object.assign({}, state, {
        network: action.bool
      });
    case GET_WEB3:
      return Object.assign({}, state, {
        web3: action.web3
      });
    default:
      return state;
  }
}

export default reducer;
