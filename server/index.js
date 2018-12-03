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

app.post('/api/attendees', (req, res) => {
  // console.log(req.body);

  const { firstName, lastName, company, industry, local, email, photoURL, linkedInURL } = req.body;

  db.saveAttendee(firstName, lastName, company, industry, local, linkedInURL, email, photoURL, (error, results) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      // want to get the user id and save to App state
      res.status(201).send();
    }
  });


});



let port = 3000;

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});

