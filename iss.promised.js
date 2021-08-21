const request = require('request-promise-native');

const fetchMyIP = function() {
  const url = 'https://api.ipify.org/?format=json';
  return request(url);
};

const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  const url = `https://freegeoip.app/json/${ip}`;
  return request(url);
};

const fetchISSFlyOverTimes = function(body) {
  const { latitude, longitude } = JSON.parse(body);
  const url = `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`;
  return request(url);
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then((body) => {
    const { response } = JSON.parse(body);
    return response;
  });
};


module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes,  nextISSTimesForMyLocation };