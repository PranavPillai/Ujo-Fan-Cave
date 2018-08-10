import Truffle from 'truffle-contract';

import {
  GET_ACCOUNT,
  GOT_CONTRACT,
  LOADING_CONTRACT,
  GET_NETWORK,
  GET_WEB3,
} from '../../constants/ActionTypes';

export const setWeb3 = web3 => ({type: GET_WEB3, web3});

// receives true if the user is on a valid network, false if not
export const setValidNetwork = bool => ({type: GET_NETWORK, bool});

export const setContract = contract => ({type: GOT_CONTRACT, contract});
export const loadingContract = contract => ({type: LOADING_CONTRACT, contract});

let configuredContract;
export const initializeContract = (contract, web3) => {
  // configures contract using truffle and current provider
  if (!configuredContract){
    configuredContract = Truffle(contract);
    configuredContract.setProvider(web3.currentProvider);
  };
};

/**
 * THUNK CREATORS
 */
export const fetchContract = () => async dispatch => {
  dispatch(loadingContract('Loading contract'))
  // returns a promise to avoid any race conditions on initial price fetch
  const deployedContract = await configuredContract.deployed();
  dispatch(setContract(deployedContract));
};

export const setAccount = account => ({type: GET_ACCOUNT, account});
