// has available props.attendees from App state

import Group from './Group.jsx';

import React from 'react';

function Groups(props) {

  const groups = [];

  // filter the props.attendees array by groups
  const group1 = props.attendees.filter(attendeeObj => {
    return attendeeObj.groupnumber === 1;
  });
  groups.push(group1);

  const group2 = props.attendees.filter(attendeeObj => {
    return attendeeObj.groupnumber === 2;
  });
  groups.push(group2);

  const group3 = props.attendees.filter(attendeeObj => {
    return attendeeObj.groupnumber === 3;
  });
  groups.push(group3);

  const group4 = props.attendees.filter(attendeeObj => {
    return attendeeObj.groupnumber === 4;
  });
  groups.push(group4);

  const group5 = props.attendees.filter(attendeeObj => {
    return attendeeObj.groupnumber === 5;
  });
  groups.push(group5);


  return (
    <div>
      Scroll down to see all the sorted groups.
      {groups.map((group, index) => {
        return <Group key={index.toString()} groupNumber={index + 1} groupList={group} />
      })}
    </div>
  )
}

export default Groups;