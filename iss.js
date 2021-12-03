/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require('request');
const fetchMyIP = (callback) => {

  request("https://api.ipify.org?format=json", (err, response, body) => {
    if (err) {
      return callback(err,null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const data = JSON.parse(body).ip;
    return callback(null, data);
  });
};

const fetchCoordsByIP = (ip, callback) => {

  request(`https://freegeoip.app/json/${ip}`, (err,response,body) => {
    if (err) {
      return callback(err,null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coords. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const data = JSON.parse(body);
    const coords = { latitude : data.latitude, longitude: data.longitude};
    return callback(null, coords);
  });
};

const fetchISSFlyOverTimes = (coords, callback) => {
  request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (err,response,body) => {
    if (err) {
      return callback(err,null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching FlyOver Times. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const data = JSON.parse(body).response;
    return callback(null, data);
  });
};

const nextISSTimesForMyLocation = (callback) => {

  fetchMyIP((error, ip) => {
    if (error) {
      console.log("\nfetchMyIP:\nIt didn't work!" , error);
      return;
    }
    // console.log('\nfetchMyIP:\nIt worked! Returned IP:' , ip);
    fetchCoordsByIP(ip, (err, coords) => {
      if (err) {
        console.log("\nfetchCoordsByIP:\nError: ",err);
        return;
      }
      // console.log(`\nfetchCoordsByIP:\n\nLatitude: ${coords.latitude}\nLongitude: ${coords.longitude}\n`);
  
      fetchISSFlyOverTimes(coords, (err,times) => {
        if (err) {
          console.log("\fetchISSFlyOverTimes:\nError: ",err);
          return;
        }
        // console.log("\nTimes: ",times);
        callback(error,times);
      });
    });
    
  });
};


module.exports = {
  nextISSTimesForMyLocation
};


