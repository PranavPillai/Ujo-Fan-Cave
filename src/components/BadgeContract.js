import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBadgesByAddress } from '../store/web3/actions';

/*
You know you've correctly set up your environment if your simple storage contract is working - you should be able to set and get the value in your smart contract. If not, somethings not right
*/

class BadgeContract extends Component {

  constructor(props){
    super(props)
    this.state = {
      value: 0,
      error: null
    }
  }

  // gets the number stored in smart contract storage
  getBadges = () => {
    const { account } = this.props;
    this.props.getBadgesByAddress(account);
  }

  // // adds one to the storage in smart contract, refetches contract to update state
  // addOne = async () => {
  //   const { badgeContract, account } = this.props;
  //   const { value } = this.state;
  //   // sets the gas price manually to make sure the transaction goes through
  //   await badgeContract.set(value + 1, {from: account, gasPrice: 5000000000});
  //   this.getNumber();
  // }

  render(){
    const { value, error } = this.state;
    return(
      <div>
        {
        error ?
          <h1>Oh no! Something went wrong: {error}</h1> :
          <div>
            <h1>The number stored in your smart contract is: <br /> {value} </h1>
            <button onClick={this.addOne}>Add One</button>
            <button onClick={this.getBadges}>Get Badges</button>
          </div>
        }
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapStateToProps = (state) => {
  return {
    badgeContract: state.web3.badgeContract,
    account: state.web3.account,
  }
}

export default connect(
  mapStateToProps,
  {
    getBadgesByAddress,
  }
)(BadgeContract);
