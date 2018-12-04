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
        // console.log('data from ajax request for attendee list>>>', data);
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

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max)) + 1;
  }

  mixGroups() {
    // * to develop further later... 
    // current just spreading out 
    // MVP mixing just based on diversity of industries -- later will add in location, gender, etc.
    // make dyanmic basic on the industry options that are set by admin
    // number of groups determined by amount of attendeees divded by how many people you want in each group

    const groups = {
      1: { industryCounts: { government: 0, tech: 0, healthcare: 0, nonprofit: 0, law: 0, finance: 0, marketing: 0, other: 0 }, attendees: [] },
      2: { industryCounts: { government: 0, tech: 0, healthcare: 0, nonprofit: 0, law: 0, finance: 0, marketing: 0, other: 0 }, attendees: [] },
      3: { industryCounts: { government: 0, tech: 0, healthcare: 0, nonprofit: 0, law: 0, finance: 0, marketing: 0, other: 0 }, attendees: [] },
      4: { industryCounts: { government: 0, tech: 0, healthcare: 0, nonprofit: 0, law: 0, finance: 0, marketing: 0, other: 0 }, attendees: [] },
      5: { industryCounts: { government: 0, tech: 0, healthcare: 0, nonprofit: 0, law: 0, finance: 0, marketing: 0, other: 0 }, attendees: [] },
    }

    let currentIndustryMax = {
      government: 0,
      tech: 0,
      healthcare: 0,
      nonprofit: 0,
      law: 0,
      finance: 0,
      marketing: 0,
      other: 0
    };

    // iterate through guests
    this.state.attendees.forEach(guestToSort => {
      let guestIsSorted = false;

      // iterate through groups
      // ** after MVP, need to start the loop by checking the smallest group first -- currently weighting adding to the early keys (making early keys have larger group), but still check all keys before moving on
      for (var key in groups) {
        // for a given group, if the amount of guests from that industry is less than the currMax of that industrynumber across all groups, safe to add them to teh group
        if (groups[key].industryCounts[guestToSort.industry] < currentIndustryMax[guestToSort.industry]) {
          groups[key].attendees.push(guestToSort);
          groups[key].industryCounts[guestToSort.industry]++;
          guestIsSorted = true;
          break; // only need to sort each guest once; stop iterating through groups
        }
      }

      if (!guestIsSorted) {
        // if after iterating through all the groups, the guest did not get sorted
        // add the guest to the group with the least amount of attendees, 
        // increment the count for that group, and increment the max by 1

        const groupIds = Object.keys(groups);
        const sorted = groupIds.sort((a, b) => {
          if (groups[a].attendees.length > groups[b].attendees.length) {
            return 1
          } else return -1
        })
        console.log('sorted>>', sorted);

        groups[sorted[0]].attendees.push(guestToSort);
        groups[sorted[0]].industryCounts[guestToSort.industry]++;
        currentIndustryMax[guestToSort.industry]++;
      }
    });

    console.log('groups after sorting: ', groups);
    console.log('currentIndustryMax: ', currentIndustryMax);

    // ** TO DO TUESDAY - SAVE TO DATABASE -- update group numbers by iterating through group
    // update attendee Data in App state
    // setup component to show groups for currLoggedInGuest 
    // move db password out of file


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