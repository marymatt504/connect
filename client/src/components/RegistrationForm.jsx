import React from 'react';

// receieves from props updateEventData to update the state after post

class RegistrationForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      company: '',
      industry: '',
      local: false,
      linkedInURL: '',
      email: '',
      photoURL: '',
      eventId: this.props.eventData.eventId
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleSubmit(event) {
    // post to database
    $.ajax({
      method: 'POST',
      url: `api/attendees`,
      type: 'application/json',
      data: JSON.stringify(this.state),
      success: data => {
        // on success, i want to capture the id for this attendee
        // and save it in the App state 
        console.log('data posted!');

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
        this.props.updateEventData();
        event.preventDefault();
      },
      error: (error) => console.log(error.message)
    })



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
      </div>
    );
  }
}

export default RegistrationForm;