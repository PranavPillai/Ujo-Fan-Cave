import React from 'react';
import { connect } from 'react-redux';
import BadgeList from '../Badges/BadgeList';

class Navbar extends React.Component {
  render() {
    return (
      <div>
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
