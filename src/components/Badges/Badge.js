import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './styles.css';

class Badge extends React.Component {
  render() {
    const {badge: {image: {contentURL: imgSrc}, name, id}} = this.props;
    return (
      <Link to={'/pages/' + id}>
        <div className="badge-container">
          <img src={imgSrc} alt='Artist Badge' className='badge-image'/>
          <p className='badge-name'> {name} </p>
        </div>
      </Link>
    );
  }
}

export default withRouter(Badge);
