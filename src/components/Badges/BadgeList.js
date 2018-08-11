import React from 'react';
import Badge from './Badge';

class BadgeList extends React.Component {

  render() {
    return (
      <div className="badge-container">
        {this.props.badges.map(badge =>
          (<Badge
          key={badge.name}
          badgeName={badge.name}
          image={badge.image}/>)
        )}
      </div>
    );
  }
}

export default BadgeList;
