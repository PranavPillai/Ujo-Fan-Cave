import {
  GET_ACCOUNT,
  GOT_CONTRACT,
  LOADING_CONTRACT,
  GET_NETWORK,
  GET_WEB3,
  GOT_BADGE_CONTRACT,
  LOADING_BADGE_CONTRACT,
  GET_PATRONAGE_BADGES_REQUEST,
  GET_PATRONAGE_BADGES_SUCCESS,
  GET_PATRONAGE_BADGES_FAILURE,
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
    case GOT_BADGE_CONTRACT:
      return Object.assign({}, state, {
        badgeContract: action.contract
      });
    case LOADING_CONTRACT:
      return Object.assign({}, state, {
        contract: action.contract
      });
    case LOADING_BADGE_CONTRACT:
      return Object.assign({}, state, {
        badgeContract: action.contract
      });
    case GET_NETWORK:
      return Object.assign({}, state, {
        network: action.bool
      });
    case GET_WEB3:
      return Object.assign({}, state, {
        web3: action.web3
      });
    case GET_PATRONAGE_BADGES_REQUEST:
      return Object.assign({}, state, {
        badgesLoading: true,
      });
    case GET_PATRONAGE_BADGES_SUCCESS:
      return Object.assign({}, state, {
        badgesLoaded: true,
        badgesLoading: false,
        badges: action.data,
        badgesFailure: false,
      });
    case GET_PATRONAGE_BADGES_FAILURE:
      return Object.assign({}, state, {
        badgesLoaded: false,
        badgesLoading: false,
        badgesFailure: true,
      });
    default:
      return state;
  }
}

export default reducer;
