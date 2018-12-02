const faker = require('faker');

const starttimes = ['17:00', '17:30', '18:00', '18:30', '19:00'];
const randNum = max => Math.floor(Math.random() * max);

let fullDate = JSON.stringify(faker.date.between('2018-12-1', '2019-01-01'));
const splitDate = fullDate.split('T');


const title = faker.lorem.words();
const date = splitDate[0].slice(1);
const starttime = starttimes[randNum(4)];
let endTimeHour = Number(starttime.slice(0, 2)) + 2;
const endtime = endTimeHour.toString() + starttime.slice(2);

console.log('start:', starttime, 'end:', endtime);