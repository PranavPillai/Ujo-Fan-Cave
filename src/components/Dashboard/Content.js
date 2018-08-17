import React from 'react';
import classNames from 'classnames';
import crystal from '../../assets/crystal.jpg';

class Content extends React.Component {
  render() {
    const contentClassNames = classNames('content',
      {
        user_sent: this.props.address === this.props.content.address,
      },
    );
    const imageClassNames = classNames('message-image',
    {
      user_sent: this.props.address === this.props.message.address,
    },
  );
    return (
      <div className="content-container">
        <img src={this.props.imgSrc || crystal} className={imageClassNames} alt="user" />
        <li className={contentClassNames}>
          <sup>{this.props.content.name}</sup>
          <p>{this.props.content.content}</p>
        </li>
      </div>
    );
  }
}

export default Content;
