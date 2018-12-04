import React from 'react';
import $ from 'jquery';

// receieves from props updateEventData to update the state after post

class RegistrationForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      eventId: this.props.eventData.id,
      firstName: '',
      lastName: '',
      company: '',
      industry: '',
      local: false,
      linkedInURL: '',
      email: '',
      photoURL: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleSubmit(event) {
    // post to database
    event.preventDefault();

    $.ajax({
      type: 'POST',
      url: '/api/attendees',
      data: this.state,
      success: (data) => {
        console.log(`data posted at ${Date()}`);

        const loggedInGuestId = JSON.parse(data).newGuestId;

        // update on App state, currently loggedin guest and attendee data
        this.props.updateLoggedInGuest(loggedInGuestId);
        this.props.updateAttendeeData(this.state.eventId);

        this.setState({
          firstName: '',
          lastName: '',
          company: '',
          industry: '',
          local: false,
          linkedInURL: '',
          email: '',
          photoURL: ''
        });

        this.props.updateToConfirmationView();
      },
      error: (error) => {
        console.log('console log line 54 error: ', error);
      }

    });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <div>
        <h2>Fill out the form here to register for {this.props.eventData.title}.</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            First Name:
            <input type="text" name='firstName' value={this.state.firstName} onChange={this.handleChange} />
          </label>

          <label>
            Last Name:
          <input type="text" name='lastName' value={this.state.lastName} onChange={this.handleChange} />
          </label>

          <label>
            Company:
          <input type="text" name='company' value={this.state.company} onChange={this.handleChange} />
          </label>

          <label>
            Select the industry that best represents your work
          <select value={this.state.industry} name='industry' onChange={this.handleChange}>
              <option value="tech">Tech</option>
              <option value="healthcare">Healthcare</option>
              <option value="nonprofit">Nonprofit</option>
              <option value="law">Law</option>
              <option value="finance">Finance</option>
              <option value="marketing">Marketing</option>
              <option value="other">Other</option>
            </select>
          </label>

          <label>
            How long have you lived in {this.props.eventData.city} ?
          <select value={this.state.local} name='local' onChange={this.handleChange}>
              <option value={true}>3 years or less</option>
              <option value={false}>more than 3 years</option>
            </select>
          </label>

          <label>
            LinkedInURL:
          <input type="text" name='linkedInURL' value={this.state.linkedIn} onChange={this.handleChange} />
          </label>

          <label>
            Email:
          <input type="text" name='email' value={this.state.email} onChange={this.handleChange} />
          </label>

          <label>
            PhotoURL:
          <input type="text" name='photoURL' value={this.state.photo} onChange={this.handleChange} />
          </label>

          <input type="submit" value="Submit" />
        </form>
      </div >
    );
  }
}

export default RegistrationForm;