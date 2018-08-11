import React from 'react';
import './styles.css';

class Badge extends React.Component {
  render() {
    return (
      <div >
      <img src={this.props.image} alt='Artist Badge' className='badge-image'/>
      <p className='badge-name'> {this.props.badgeName} </p>
      </div>
    );
  }
}

export default Badge;
