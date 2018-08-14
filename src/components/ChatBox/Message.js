import React from 'react';
import classNames from 'classnames';


class Message extends React.Component {
  render() {
    const messageClassNames = classNames('message',
      {
        userSent: this.props.address === this.props.message.address,
        othersSent: this.props.address !== this.props.message.address,
      },
    ); 
    return (
      <div className={messageClassNames}>
        {
          this.props.message.message
        }
        --{
          this.props.message.name
        }
      </div>
    );
  }
}

export default Message;