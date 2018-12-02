DROP DATABASE IF EXISTS event_connections;

CREATE DATABASE event_connections;
\c event_connections;

DROP TABLE IF EXISTS events;

CREATE TABLE IF NOT EXISTS events (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  day TEXT,
  date DATE NOT NULL, 
  startTime TIME NOT NULL,
  endTime TIME NOT NULL,
  venueName TEXT NOT NULL,
  location_address1 VARCHAR(120) NOT NULL,
  location_address2 VARCHAR(120),
  location_address3 VARCHAR(120),
  city VARCHAR(100) NOT NULL,
  state CHAR(2) NOT NULL,
  country VARCHAR(20) NOT NULL,
  postalCode  VARCHAR(16) NOT NULL,
  description TEXT NOT NULL
);

DROP TABLE IF EXISTS attendees;

CREATE TABLE IF NOT EXISTS attendees (
  id SERIAL PRIMARY KEY,
  event_id INTEGER,
  firstName VARCHAR(120) NOT NULL,
  lastName VARCHAR(120) NOT NULL,
  company VARCHAR(150) NOT NULL,
  industry VARCHAR(150) NOT NULL,
  local BOOLEAN NOT NULL,
  linkedinurl VARCHAR(200) NOT NULL,
  email VARCHAR(150) NOT NULL,
  photourl TEXT NOT NULL,
  groupnumber INTEGER,
  FOREIGN KEY (event_id) REFERENCES events (id)
);

-- COMPLETE THESE LINES!!!
COPY events("title", "date", "starttime", "endtime", "venuename", "location_address1", "city", "state", "country", "postalcode", "description") FROM '/Users/marymatthews/connect/database/events.csv' WITH DELIMITER ',' CSV HEADER;
COPY attendees("event_id", "firstname", "lastname", "company", "industry", "local", "linkedinurl", "email", "photourl", "groupnumber") FROM '/Users/marymatthews/connect/database/attendees.csv' WITH DELIMITER ',' CSV HEADER;
