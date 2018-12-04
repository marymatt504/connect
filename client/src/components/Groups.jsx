// has available props.attendees from App state

import Group from './Group.jsx';

import React from 'react';

function Groups(props) {
  return (
    <div>
      groups will go here...
      {/* will want to render a componeent for each guest using map, need to make profile component */}
      <Group />
      <Group />
    </div>
  )
}

export default Groups;