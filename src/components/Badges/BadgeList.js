import React from 'react';
import Badge from './Badge';

class BadgeList extends React.Component {

  render() {
    console.log(this.props.badges);
    const { badges } = this.props;
    return (
      <div className="badge-container">
        {Object.keys(badges).map(badgeId =>
          (<Badge
          key={badgeId}
          badge={badges[badgeId]}/>)
        )}
      </div>
    );
  }
}

export default BadgeList;
