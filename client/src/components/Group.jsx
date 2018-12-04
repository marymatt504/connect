// props.groupList is array of attendees

import Profile from './Profile.jsx';

import React from 'react';

function Group(props) {
  return (
    <div>
      <h3>Group #{props.groupNumber}</h3>
      This is one group with several profiles
      {/* <Profile /> */}
      {/* <Profile /> */}
    </div>
  )
}

export default Group;