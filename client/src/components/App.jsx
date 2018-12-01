import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // user can be guest or admin 
      user: '',
      view: '',
      eventId: 0,
      eventData: {},
      currAttendeeId: 0,
      allAttendeeData: {},
    };

  }

  render() {
    return (<div>
      <h1>App will render here.</h1>
    </div>)
  }
}

export default App; 