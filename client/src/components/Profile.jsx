import React from 'react';
// one attendeeObj will be passed in as a prop

function Profile(props) {
  return (
    <div>
      <img src={props.attendee.photourl} alt="profile pic" />
      <div>Name: {props.attendee.firstname + '' + props.attendee.lastname}</div>
      <div>Company: {props.attendee.company + ' '} Industry: {props.attendee.industry}</div>
      <div>Connect on LinkedIn: <a href={"http://" + props.attendee.linkedinurl}>{props.attendee.linkedinurl}</a></div>
    </div>
  )
}

export default Profile;