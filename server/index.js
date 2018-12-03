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



let port = 3000;

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});

