import React from 'react';
import './styles.css';

class Badge extends React.Component {
  render() {
    const {badge: {image: {contentURL: imgSrc}, name}} = this.props;
    return (
      <div >
      <img src={imgSrc} alt='Artist Badge' className='badge-image'/>
      <p className='badge-name'> {name} </p>
      </div>
    );
  }
}

export default Badge;
