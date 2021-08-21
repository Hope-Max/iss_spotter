const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss.promised');

// fetchMyIP()
//   .then(fetchCoordsByIP)
//   .then(fetchISSFlyOverTimes)
//   .then((body) => {
//     const { response } = JSON.parse(body);
//     console.log(response);
//   });

const printPassTimes = function(passTimes) {

  for (let passTime of passTimes) {
    const time = new Date(0);
    time.setUTCSeconds(passTime.risetime);
    const msg = `Next pass at ${time} for ${passTime.duration} seconds! `;
    console.log(msg);
  }
};

nextISSTimesForMyLocation()
  .then((body) => {
    printPassTimes(body);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });