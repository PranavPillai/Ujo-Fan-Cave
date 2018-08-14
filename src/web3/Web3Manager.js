import React from 'react';
import Web3 from 'web3';
import { connect } from 'react-redux';
import { setWeb3, setAccount, setValidNetwork, initializeBadgeContract, fetchBadgeContract, getBadgesByAddress } from '../store/web3/actions';
import { fetchUser } from '../store/user/actions';

const fetchWeb3 = (localProvider = null) => {
  let { web3 } = window;
  if (localProvider) {
    const provider = new Web3.providers.HttpProvider(localProvider)
    web3 = new Web3(provider)
    return web3;
  }
  else if (typeof web3 !== 'undefined') {
    // create new web3 instance with currentProvider
    web3 = new Web3(web3.currentProvider);
    web3.eth.defaultAccount = web3.eth.accounts[0];
    return web3;
  }
  // if metamask did not inject web3 and we have no localProvider
  else {
    return null;
  }
};

class Web3Manager extends React.Component {
  componentDidMount(){
    const { interval } = this.props;
    // continuously look for updates to the window's web3 obj
    this.intervalId = setInterval(this.collectWeb3Data.bind(this), interval || 500);
  }

  componentWillUnmount(){
    // clears interval in case the component unmounts to avoid memory leaks
    clearInterval(this.intervalId);
  }

  async collectWeb3Data() {
    // if any localProvider was passed in as prop, we use it to construct the web3 object
    const { localProvider, hasWeb3, setWeb3,
      currentAccount, setAccount,
      validNetwork, requiredNetwork, setValidNetwork, 
      badgeContract, initializedBadgeContract, 
      fetchBadgeContract, getBadgesByAddress, fetchUser } = this.props;

    const web3 = fetchWeb3(localProvider || null);

    /* --  we only dispatch actions if anything important CHANGED -- */

    if (web3){
      // dispatches an action if a web3 instance was recently created
      if (!hasWeb3) setWeb3(web3);

      // /* ---------- ensures the user is on the right network ----------- */
      const currentNetworkId = Number(web3.version.network);

      // if component received a validNetwork prop, we make sure the user is on the valid network
      const onCorrectNetwork = requiredNetwork ?
      requiredNetwork === currentNetworkId : true;

      // valid network refers to the previous bool value kept on redux store
      const changedToValidNetwork = onCorrectNetwork && !validNetwork;

      if (changedToValidNetwork) setValidNetwork(true);

      /* ------------- checks for unlocked account change -------------- */
      const [ account ] = web3.eth.accounts;
      const recentlyChangedAccount = account && account !== currentAccount;
      const recentlyLoggedOut = !account && currentAccount;

      // if an important account changed, dispatch the appropriate action
      if (recentlyChangedAccount || recentlyLoggedOut) {
        setAccount(account);
      }

      /* -------- initializes smart contract if not already done ---------- */
      if(!initializedBadgeContract && badgeContract && account) {
        await initializeBadgeContract(badgeContract, web3);
        await fetchBadgeContract();
        await getBadgesByAddress(account);
        await fetchUser(account);
      }
    }
  }

  render(){
    return(null)
  }
}

function mapStateToProps(state) {
  return {
    hasWeb3: Object.keys(state.web3.web3).length > 0,
    validNetwork: state.web3.network,
    currentAccount: state.web3.account,
    initializedContract: Object.keys(state.web3.contract).length > 0,
    initializedBadgeContract: Object.keys(state.web3.badgeContract).length > 0,
  };
}

export default connect(
  mapStateToProps,
  {
    setWeb3,
    setAccount,
    setValidNetwork,
    fetchBadgeContract,
    getBadgesByAddress,
    fetchUser,
  }
)(Web3Manager);
