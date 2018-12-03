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
    // client.end();
  });
};

module.exports = { getEventData };
