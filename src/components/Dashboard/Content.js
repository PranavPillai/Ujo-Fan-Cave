import React from 'react';
import classNames from 'classnames';
import { Segment } from 'semantic-ui-react';

class Content extends React.Component {
  render() {
    const segmentClassNames = classNames('post', {hidden: !this.props.notHidden});
    return (
      <div className={segmentClassNames}>
        <Segment>
          <sup>{this.props.content.time}</sup>
          <p>{this.props.content.content}</p>
        </Segment>
      </div>
    );
  }
}

export default Content;
