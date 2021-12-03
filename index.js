const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  for (const times in passTimes) {
    console.log(`Next pass at ${Date(passTimes[times].risetime)} for ${passTimes[times].duration} seconds!`);
  }
});