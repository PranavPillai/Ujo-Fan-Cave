import React from 'react';
import classNames from 'classnames';
import { Container, Segment } from 'semantic-ui-react';

class Content extends React.Component {
  render() {
    const contentClassNames = classNames('content',
      {
      },
    );
    const imageClassNames = classNames('message-image',
    {
    },
  );
    return (
      // <div className="content-container">
      //   <li className={contentClassNames}>
      //     <sup>{this.props.content.name}</sup>
      //     <p>{this.props.content.content}</p>
      //   </li>
      // </div>
      <Segment>
        <sup>{this.props.content.time}</sup>
        <p>{this.props.content.content}</p>
      </Segment>
    );
  }
}

export default Content;
