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
  country CHAR(2) NOT NULL,
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
  linkedInURL VARCHAR(150) NOT NULL,
  email VARCHAR(150) NOT NULL,
  photoURL TEXT NOT NULL,
  FOREIGN KEY (event_id) REFERENCES events (id)
);

-- COPY movies("title", "year", "image", "actor") FROM '/Users/marymatthews/SDC/related_movies/database/movie4.csv' WITH DELIMITER ',' CSV HEADER;
-- COPY movies("title", "year", "image", "actor") FROM '/Users/marymatthews/SDC/related_movies/database/movie4.csv' WITH DELIMITER ',' CSV HEADER;
