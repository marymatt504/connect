import React from 'react';

function EventHome(props) {
  console.log('eventData>>>>', props.eventData);
  let { title, date, starttime, endtime, venuename, location_address1, city, state, postcode, description } = props.eventData;
  if (date) {
    date = date.slice(0, 10);
  }
  if (starttime) {
    starttime = starttime.slice(0, 5);
    endtime = endtime.slice(0, 5);
  }

  return (
    <div>
      <h2>Join us for our next connections event...</h2>
      <h3>{title}</h3>
      <h4><i>{description}</i></h4>
      <h4><i>Where: {venuename}, {location_address1}, {city}, {state} {postcode}</i></h4>
      <h4><i>When: {date}, {starttime} - {endtime}</i></h4>
      <button onClick={props.handleRegister}>
        Register
      </button>
      <button>
        Admin Login
      </button>

    </div>
  );
}

export default EventHome;