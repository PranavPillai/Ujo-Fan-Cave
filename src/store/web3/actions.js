import Truffle from 'truffle-contract';
import {
  fetchBadgeData,
  prepareBadgesForRedux,
} from './helpers';

import {
  GET_ACCOUNT,
  GET_NETWORK,
  GET_WEB3,
  GOT_BADGE_CONTRACT,
  LOADING_BADGE_CONTRACT,
  GET_PATRONAGE_BADGES_REQUEST,
  GET_PATRONAGE_BADGES_SUCCESS,
  GET_PATRONAGE_BADGES_FAILURE,
} from '../../constants/ActionTypes';

export const setWeb3 = web3 => ({type: GET_WEB3, web3});

// receives true if the user is on a valid network, false if not
export const setValidNetwork = bool => ({type: GET_NETWORK, bool});

export const setBadgeContract = contract => ({type: GOT_BADGE_CONTRACT, contract});

export const loadingBadgeContract = contract => ({type: LOADING_BADGE_CONTRACT, contract});

let patronageBadges;
export const initializeBadgeContract = (contract, web3) => {
  // configures contract using truffle and current provider
  if (!patronageBadges) {
    patronageBadges = Truffle(contract);
    patronageBadges.setProvider(web3.currentProvider);
  }
};

/**
 * THUNK CREATORS
 */

export const fetchBadgeContract = () => async dispatch => {
  dispatch(loadingBadgeContract('Loading badge contract'));
  // returns a promise to avoid any race conditions on initial price fetch
  const deployedBadgeContract = await patronageBadges.deployed();
  dispatch(setBadgeContract(deployedBadgeContract));
};

export const getBadgesByAddress = walletAddress => async (dispatch) => {
  dispatch({ type: GET_PATRONAGE_BADGES_REQUEST });
  try {
    const patronageBadgesInstance = await patronageBadges.deployed();
    const badgesByAddress = await patronageBadgesInstance.getAllTokens.call(walletAddress);
    const badgeCids =
      await Promise.all(badgesByAddress.map(badgeId =>
        !isNaN(badgeId) && patronageBadgesInstance.tokenURI.call(badgeId)));
    const confirmedBadgeData =
      await Promise.all(badgeCids.map(cid =>
        fetchBadgeData(cid, 'confirmed')));
    const data = prepareBadgesForRedux([...confirmedBadgeData]);

    dispatch({
      type: GET_PATRONAGE_BADGES_SUCCESS, data,
    });
  } catch (err) {
    dispatch({ type: GET_PATRONAGE_BADGES_FAILURE, err });
  }
};

export const setAccount = account => ({type: GET_ACCOUNT, account});
