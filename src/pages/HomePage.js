import React from 'react';
import { connect } from 'react-redux';
import BadgeList from '../components/Badges/BadgeList';
import carson from '../assets/CarsonWentz.jpg';
import kevin from '../assets/Kevin.jpg';
import ujo from '../assets/ujo.png';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      badges : [
        {
          name : 'Big Guy special release',
          image : carson,
        },
        {
          name : 'Small Guy t-shirt',
          image : kevin,
        },
        {
          name : 'Medium Guy concert tickets',
          image : ujo,
        },
      ]
    }
  }

  render() {
    return (
      <div>
        <h1>This is the Home Page!</h1>
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

export default connect(mapStateToProps)(HomePage);
