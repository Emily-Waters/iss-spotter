const { nextISSTimesForMyLocation } = require("./iss_promised");
// fetchMyIP()
//   .then(fetchCoordsByIP)
//   .then(fetchISSFlyOverTimes)
//   .then(body => {
//     const times = JSON.parse(body).response;
//     times.forEach(element => {
//       console.log(`Next pass at ${Date(element.risetime)} for ${element.duration} seconds!`);
//     });
//   });

nextISSTimesForMyLocation();