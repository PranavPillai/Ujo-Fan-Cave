import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BadgeList from '../components/Badges/BadgeList';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      badges : [
        {
          name : 'Big Guy special release',
          color : 'red'
        },
        {
          name : 'Small Guy t-shirt',
          color : 'blue'
        },
        {
          name : 'Medium Guy concert tickets',
          color : 'green'
        },
      ]
    }
  }
  render() {
    return (
      <div>
        <h1>This is the Home Page!</h1>
        <BadgeList badges={this.state.badges} />
      </div>
    );
  }
}

export default HomePage;