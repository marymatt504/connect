import React from 'react';
import EventHome from './EventHome.jsx'
import RegistrationForm from './RegistrationForm.jsx';
import Confirmation from './Confirmation.jsx';
import Groups from './Groups.jsx';
import Admin from './Admin.jsx';

const $ = require('jquery');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // user can be guest or admin 
      user: 'admin',
      view: 'home',
      eventId: 2,
      eventData: {},
      loggedInGuestId: 0,
      attendees: []
    };
    this.updateEventData = this.updateEventData.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.updateAttendeeData = this.updateAttendeeData.bind(this);
    this.updateLoggedInGuest = this.updateLoggedInGuest.bind(this);
    // this.updateView = this.updateView.bind(this);
    this.updateToConfirmationView = this.updateToConfirmationView.bind(this);
    this.updateToGroupsView = this.updateToGroupsView.bind(this);
    this.handleAdminLogin = this.handleAdminLogin.bind(this);
    this.mixGroups = this.mixGroups.bind(this);
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

  handleAdminLogin() {
    this.setState({ view: 'admin_panel', user: 'admin' });
  }

  // To do: refactor view updates to use one shared method
  // updateView(newView) {
  //   console.log('updating view to: ', newView);
  //   this.setState({
  //     view: newView
  //   });
  // }

  updateToConfirmationView() {
    this.setState({
      view: 'confirmation'
    });
  }

  updateToGroupsView() {
    this.setState({
      view: 'groups'
    });
  }

  mixGroups() {
    // PUT request to database
    // i have available in this.state.attendees an array of about 30 attendee objs

    // number of groups determined by amount of attendeees divded by how many people you want in each group
    // later will make this dynamic based on input by admin

    const groups = {
      1: [],
      2: [],
      3: [],
      4: [],
      5: []
    }

    // const industries = ['government', 'tech', 'healthcare', 'nonprofit', 'law', 'finance', 'marketing', 'other'];

    // later make dyanmic basic on the industry options that are set by admin
    let governmentMax = 0;



    // iterate through guests
    // iterate through groups
    // if # of guests w/ the same industy as current guest in the current group is less than
    // the max across all groups for the given industry
    // add the current guest to that group
    // break to move on to the next gues
    // if reach the end of the groups and none had less than the max #,
    // add current guest to group 1, and increment the max# by 1


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
        <EventHome eventData={this.state.eventData} handleRegister={this.handleRegister} handleAdminLogin={this.handleAdminLogin} />
        {/* We are expecting ${this.state.attendees[0].firstName + " " + this.state.attendees[0].lastName} among our guests! */}
      </div>)
    }

    if (this.state.view === 'register') {
      return (
        <div>
          <RegistrationForm eventData={this.state.eventData} updateLoggedInGuest={this.updateLoggedInGuest} updateAttendeeData={this.updateAttendeeData} updateToConfirmationView={this.updateToConfirmationView} />
        </div>
      )
    }

    if (this.state.view === 'confirmation') {
      return (
        <div>
          <Confirmation eventData={this.state.eventData} updateToGroupsView={this.updateToGroupsView} />
        </div>
      )
    }

    if (this.state.view === 'groups') {

      return (
        <div>
          {/* in groups, want to pass down a filtered list of attendees by the group number of the currentlylogged in guest */}
          <Groups />
        </div>
      )
    }

    if (this.state.view === 'admin_panel') {
      return (
        <div>
          <Admin mixGroups={this.mixGroups} />
        </div>
      )
    }

  }
}

export default App; 