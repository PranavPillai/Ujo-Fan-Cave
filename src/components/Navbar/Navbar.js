import React from 'react';
import { connect } from 'react-redux';
import BadgeList from '../Badges/BadgeList';
import './styles.css';

class Navbar extends React.Component {
  render() {
    return (
      <div className="navbar">
        <div className="header-container">
          <h5 className="header">THE BEAT</h5>
          <sup className="header-subtext">An Ujo Formation</sup>
        </div>
        {
          Object.keys(this.props.badges).length > 0 && <BadgeList badges={this.props.badges} />
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    badges: state.web3.badges,
  }
}

export default connect(mapStateToProps)(Navbar);
