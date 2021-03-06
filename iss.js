const request = require('request');

const fetchMyIP = function(callback) {
  const url = 'https://api.ipify.org/?format=json';
  request(url, (error, response, body) => {
    
    if (error) {
      callback(error, null);
      return;
    }
    
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
      
    const data = JSON.parse(body);
    const ip = data.ip;
    callback(null, ip);

  });
};

const fetchCoordsByIP = function(ip, callback) {
  const url = `https://freegeoip.app/json/${ip}`;
  request(url, (error, response, body) => {
    if (error) return callback(error, null);
    
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    // const coordinates = {};
    // const data = JSON.parse(body);
    // console.log(data);
    // coordinates.latitude = data.latitude;
    // coordinates.longitude = data.longitude;
    // callback(null, coordinates);
    const { latitude, longitude } = JSON.parse(body);
    callback(null, { latitude, longitude });

  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  const url = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;
  request(url, (error, response, body) => {
    if (error) return callback(error, null);
    
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS flyover pass times. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
  
    const passes = JSON.parse(body).response;
    callback(null, passes);
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {

    if (error) return callback(error, null);
    fetchCoordsByIP(ip, (error, coords) => {

      if (error) return callback(error, null);
      fetchISSFlyOverTimes(coords, (error, passTimes) => {

        if (error) return callback(error, null);
        callback(null, passTimes);
      
      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };
// module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };
