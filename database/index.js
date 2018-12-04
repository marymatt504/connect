const { Pool, Client } = require('pg');

const pool = new Pool({
  user: 'marymatthews',
  password: 'password',
  // host: 'localhost',
  // port: 5432,
  database: 'event_connections',
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.log('error from server/index.js line 12>>>', err);
  } else {
    console.log(null, res);
  }
  pool.end();
});

const client = new Client({
  user: 'marymatthews',
  password: 'password',
  // host: '3.17.23.188',
  // port: 5432,
  database: 'event_connections',
});
client.connect();

//***** DATABASE METHODS */

const getEventData = (eventId, callback) => {

  const query = {
    text: 'SELECT * FROM events WHERE id = $1',
    values: [eventId],
  };

  client.query(query, (error, results) => {
    if (error) {
      callback(error);
    } else {
      callback(null, results);
    }
  });
};

const saveAttendee = (event_id, firstName, lastName, company, industry, local, linkedInURL, email, photoURL, callback) => {

  const query = {
    text: 'INSERT INTO attendees(event_id, firstName, lastName, company, industry, local, linkedInURL, email, photoURL) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id',
    values: [event_id, firstName, lastName, company, industry, local, linkedInURL, email, photoURL],
  };

  client.query(query, (error, results) => {
    if (error) {
      callback(error);
    } else {
      // capture the id for this user and save to App state b/c they are now logged in!
      console.log(results);
      callback(null, results);
    }
  });

};

const getAttendeeData = (event_id, callback) => {
  const query = {
    text: 'SELECT * FROM attendees WHERE event_id = $1',
    values: [event_id],
  };

  client.query(query, (error, results) => {
    if (error) {
      callback(error);
    } else {
      callback(null, results);
    }
  });
};

const updateAttendeeGroup = (groupnumber, id, callback) => {
  const query = {
    text: 'UPDATE attendees SET groupnumber = $1 WHERE id = $2',
    values: [groupnumber, id]
  }

  client.query(query, (error, results) => {
    if (error) {
      callback(error);
    } else {
      callback(null, results);
    }
  });

}

module.exports = { getEventData, saveAttendee, getAttendeeData, updateAttendeeGroup };
