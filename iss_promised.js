const request = require('request-promise-native');

const fetchMyIP = () =>{
  return request("https://api.ipify.org?format=json");
};

const fetchCoordsByIP = (body) => {
  const ip = JSON.parse(body).ip;
  return request(`https://freegeoip.app/json/${ip}`);
};

const fetchISSFlyOverTimes = (coords) => {
  const {latitude,longitude} = JSON.parse(coords);
  return request(`https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`);
};

const nextISSTimesForMyLocation = () => {
  fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then(body => {
      const times = JSON.parse(body).response;
      times.forEach(element => {
        console.log(`Next pass at ${Date(element.risetime)} for ${element.duration} seconds!`);
      });
    })
    .catch((error) => console.log("Error :",error));
};

module.exports = {
  nextISSTimesForMyLocation
};