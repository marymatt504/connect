import Profile from './Profile.jsx';

import React from 'react';

function Group(props) {
  return (
    <div>
      This is one group with several profiles
      <Profile />
      <Profile />
    </div>
  )
}

export default Group;