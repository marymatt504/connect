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
      eventId: 2,
      eventData: {
      },
      loggedInGuestId: 0,
      attendees: []
    };
    this.updateEventData = this.updateEventData.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.updateAttendeeData = this.updateAttendeeData.bind(this);
    this.updateLoggedInGuest = this.updateLoggedInGuest.bind(this);
    this.updateView = this.updateView.bind(this);
  }

  updateEventData(eventId) {
    $.ajax({
      url: `api/events/${eventId}`,
      success: data => {
        // console.log('data from ajax request>>>', data);
        this.setState({ eventData: data });
      },
      error: (error) => console.log(error.message)
    })
  }

  updateAttendeeData(eventId) {
    // get attendees for the given event 

    $.ajax({
      url: `api/events/${eventId}/attendees`,
      success: data => {
        console.log('data from ajax request for attendee list>>>', data);
        this.setState({ attendees: data });
      },
      error: (error) => console.log(error.message)
    });

  }

  updateLoggedInGuest(loggedInGuestId) {
    this.setState({
      loggedInGuestId: loggedInGuestId
    });
  }

  handleRegister() {
    // console.log('clicked register!')
    this.setState({ view: 'register', user: 'guest' });
  }

  updateView(newView) {
    this.setState({
      view: newView
    });
  }


  componentDidMount() {
    this.updateEventData(this.state.eventId);
    this.updateAttendeeData(this.state.eventId);

  }

  render() {

    if (this.state.view === 'home') {
      // if (this.state.attendees.length > 0) {
      //   console.log('test for attendee data>>>>>>', this.state.attendees[0].firstname);
      // }
      return (<div>
        <h1>Welcome to Event Connect!</h1>
        <EventHome eventData={this.state.eventData} handleRegister={this.handleRegister} />
        {/* We are expecting ${this.state.attendees[0].firstName + " " + this.state.attendees[0].lastName} among our guests! */}
      </div>)
    }

    if (this.state.view === 'register') {
      return (
        <div>
          <RegistrationForm eventData={this.state.eventData} updateLoggedInGuest={this.updateLoggedInGuest} updateAttendeeData={this.updateAttendeeData} updateView={this.updateView} />
        </div>
      )
    }

    if (this.state.view === 'confirmation') {
      return (
        <div>
          Congrats you are RSVPed!
          to add here... click to find your group for the event
        </div>
      )
    }

  }
}

export default App; 