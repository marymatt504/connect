import React from 'react';
import EventHome from './EventHome.jsx'
import RegistrationForm from './RegistrationForm.jsx';
const $ = require('jquery');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // user can be guest or admin 
      user: 'admin',
      view: 'home',
      eventId: 1,
      eventData: {
        // looks like...
        // "id": 2,
        // "title": "optio omnis numquam",
        // "date": "2018-12-06T08:00:00.000Z",
        // "starttime": "18:00:00",
        // "endtime": "20:00:00",
        // "venuename": "tempora adipisci hic",
        // "location_address1": "97805 Schowalter Heights Mike Route",
        // "city": "Rempeltown",
        // "state": "ND",
        // "postalcode": "08120",
        // "description": "Omnis porro quos sunt molestias libero aut et possimus. Veritatis perspiciatis quos eos eos explicabo eius. Iste ut dolorem voluptas dolores. Repudiandae voluptates nulla pariatur blanditiis doloremque itaque error dolor iste. Dolore beatae voluptatem vero veritatis."
      },
      currAttendeeId: 0,
      allAttendeeData: {},
    };
    this.updateEventData = this.updateEventData.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  updateEventData(eventId) {
    $.ajax({
      url: `api/events/${eventId}`,
      success: data => {
        console.log('data from ajax request>>>', data);
        this.setState({ eventData: data });
      },
      error: (error) => console.log(error.message)
    })
  }

  handleRegister() {
    // console.log('clicked register!')
    this.setState({ view: 'register', user: 'guest' });
  }


  componentDidMount() {
    this.updateEventData(this.state.eventId);
  }

  render() {

    if (this.state.view === 'home') {
      return (<div>
        <h1>Welcome to Event Connect!</h1>
        <EventHome eventData={this.state.eventData} handleRegister={this.handleRegister} />
      </div>)
    }
    if (this.state.view === 'register') {
      return (
        <div>
          <RegistrationForm eventData={this.state.eventData} updateEventData={this.updateEventData} />
        </div>
      )
    }

  }
}

export default App; 