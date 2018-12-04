const faker = require('faker');
const fs = require('fs');

// 7 industry types -- 8 with "other" option added on client form
const industries = ['government', 'tech', 'healthcare', 'nonprofit', 'law', 'finance', 'marketing'];

const randNum = max => Math.floor(Math.random() * max);

const file = fs.createWriteStream('database/attendees.csv');
file.write('event_id,firstname,lastname,company,industry,local,linkedInURL,email,photoURL,groupNumber\n');

// actors.push(faker.name.findName());

function writeITimes(i) {

  write();
  function write() {
    let ok = true;
    do {
      i--;
      if (i === 1) {
        // last time!

        const event_id = randNum(10) + 1;
        const firstName = faker.name.firstName();
        const lastName = faker.name.lastName();
        const company = faker.company.companyName();
        const industry = industries[randNum(6)];
        const local = faker.random.boolean();
        const linkedInURL = 'www.linkedin.com/in/' + firstName + lastName;
        const email = faker.internet.email();
        const photoURL = faker.image.avatar();
        const groupNumber = 0;


        file.write(`"${event_id}","${firstName}","${lastName}","${company}","${industry}","${local}","${linkedInURL}","${email}","${photoURL}","${groupNumber}"\n`, () => {
          console.log('wrote one');
          console.clear();
        });
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.

        const event_id = randNum(10) + 1;
        const firstName = faker.name.firstName();
        const lastName = faker.name.lastName();
        const company = faker.company.companyName();
        const industry = industries[randNum(6)];
        const local = faker.random.boolean();
        const linkedInURL = 'www.linkedin.com/in/' + firstName + lastName;
        const email = faker.internet.email();
        const photoURL = faker.image.avatar();
        const groupNumber = 0;

        ok = file.write(`"${event_id}","${firstName}","${lastName}","${company}","${industry}","${local}","${linkedInURL}","${email}","${photoURL}","${groupNumber}"\n`);

      }
    } while (i > 1 && ok);
    if (i > 1) {
      // had to stop early!
      // write some more once it drains
      file.once('drain', write);
    }
  }
}

writeITimes(400);