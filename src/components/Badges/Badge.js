import React from 'react';
import './styles.css';

class Badge extends React.Component {
  render() {
    return (
      <button className={this.props.color}>
        {this.props.badgeName}
      </button>
    );
  }
}

export default Badge;