import React from 'react';

function Confirmation(props) {
  return (
    <div>
      CONFIRMATION: Thanks for registering for {props.eventData.title} on {(props.eventData.date).slice(0, 10)}.
      <button>See who else is coming.</button>
      <button onClick={props.updateToGroupsView}>Find my group!</button>
    </div>
  )
}

export default Confirmation;