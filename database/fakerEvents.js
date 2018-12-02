const faker = require('faker');
const fs = require('fs');

const starttimes = ['17:00', '17:30', '18:00', '18:30', '19:00'];
const randNum = max => Math.floor(Math.random() * max);

const file = fs.createWriteStream('database/events.csv');
file.write('title,date,starttime,endtime,venuename,location_address1,city,state,country,postalcode,description\n');

// actors.push(faker.name.findName());

function writeITimes(i) {

  write();
  function write() {
    let ok = true;
    do {
      i--;
      if (i === 1) {
        // last time!

        // setup data
        let fullDate = JSON.stringify(faker.date.between('2018-12-1', '2019-01-01'));
        const splitDate = fullDate.split('T');


        const title = faker.lorem.words();
        const date = splitDate[0].slice(1);
        const starttime = starttimes[randNum(4)];
        let endTimeHour = Number(starttime.slice(0, 2)) + 2;
        const endtime = endTimeHour.toString() + starttime.slice(2);
        const venuename = faker.lorem.words();
        const location_address1 = faker.address.streetAddress() + ' ' + faker.address.streetName();
        const city = faker.address.city();
        const state = faker.address.stateAbbr();
        const country = faker.address.country();
        const postalcode = faker.address.zipCode();
        const description = faker.lorem.sentences();


        file.write(`"${title}","${date}","${starttime}","${endtime}","${venuename}","${location_address1}","${city}","${state}","${country}","${postalcode}","${description}"\n`, () => {
          console.log('wrote one');
          console.clear();
        });
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.

        let fullDate = JSON.stringify(faker.date.between('2018-12-1', '2019-01-01'));
        const splitDate = fullDate.split('T');


        const title = faker.lorem.words();
        const date = splitDate[0].slice(1);
        const starttime = starttimes[randNum(4)];
        let endTimeHour = Number(starttime.slice(0, 2)) + 2;
        const endtime = endTimeHour.toString() + starttime.slice(2);
        const venuename = faker.lorem.words();
        const location_address1 = faker.address.streetAddress() + ' ' + faker.address.streetName();
        const city = faker.address.city();
        const state = faker.address.stateAbbr();
        const country = faker.address.country();
        const postalcode = faker.address.zipCode();
        const description = faker.lorem.sentences();

        ok = file.write(`"${title}","${date}","${starttime}","${endtime}","${venuename}","${location_address1}","${city}","${state}","${country}","${postalcode}","${description}"\n`);

      }
    } while (i > 1 && ok);
    if (i > 1) {
      // had to stop early!
      // write some more once it drains
      file.once('drain', write);
    }
  }
}

writeITimes(11);