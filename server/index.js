const express = require('express');
const db = require('../database/index.js');
const bodyParser = require('body-parser');

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(express.static(__dirname + '/../client/dist'));

app.get('/api/events/:eventId', function (req, res) {
  const eventId = req.params.eventId;
  db.getEventData(eventId, ((error, results) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      res.status(200).send(results.rows[0]);
    }
  }))
});

app.get('/api/events/:eventId/attendees', (req, res) => {
  const eventId = req.params.eventId;

  db.getAttendeeData(eventId, ((error, results) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      // console.log('results.rows>>>>>>>', results.rows);
      res.status(200).send(results.rows);
    }
  }))
});

app.post('/api/attendees', (req, res) => {
  console.log(req.body);

  const event_id = req.body.eventId;
  const { firstName, lastName, company, industry, local, email, photoURL, linkedInURL } = req.body;

  db.saveAttendee(event_id, firstName, lastName, company, industry, local, linkedInURL, email, photoURL, (error, results) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      // want to get the user id and save to App state
      const newGuestId = results.rows[0].id;
      console.log(newGuestId, typeof newGuestId);

      res.status(201).send(JSON.stringify({ newGuestId }));
    }
  });
});

app.put('/api/attendees', (req, res) => {
  console.log(req.body);

  console.log('req.body: ', req.body);
  const { id, groupnumber } = req.body;

  db.updateAttendeeGroup(groupnumber, id, (error, results) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      res.status(202).send();
    }
  });

});



let port = 3005;

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});

