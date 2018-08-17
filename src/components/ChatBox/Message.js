import React from 'react';
import classNames from 'classnames';
import crystal from '../../assets/crystal.jpg';

class Message extends React.Component {
  render() {
    const messageClassNames = classNames('message',
      {
        user_sent: this.props.address === this.props.message.address,
        others_sent: this.props.address !== this.props.message.address,
      },
    ); 
    const imageClassNames = classNames('message-image',
      {
        user_sent: this.props.address === this.props.message.address,
        others_sent: this.props.address !== this.props.message.address,
      },
    ); 
    return (
      <div className="message-container">
        <img src={this.props.imgSrc || crystal} className={imageClassNames} alt="user" />
        <li className={messageClassNames}>
          <sup>{this.props.message.name}</sup>
          <p>{this.props.message.message}</p>
        </li>
      </div>
    );
  }
}

export default Message;