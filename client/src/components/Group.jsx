// props.groupList is array of attendees

import Profile from './Profile.jsx';

import React from 'react';

function Group(props) {

  // console.log(`list for group# ${props.groupNumber}`, props.groupList);
  return (
    <div>
      <h3>Group #{props.groupNumber}</h3>
      {props.groupList.map((attendee, index) => {
        return <Profile key={index.toString()} attendee={attendee} />
      })}
    </div>
  )
}

export default Group;