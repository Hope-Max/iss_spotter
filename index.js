// const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

// fetchCoordsByIP('162.245.144.188', (error, coordinates) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned coordinates:' , coordinates);
// });

// fetchISSFlyOverTimes({ latitude: 37.751, longitude: -97.822 }, (error, passTimes) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
  
//   console.log('It worked! Returned flyover times:' , passTimes);
// });


// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("The fetchMyIP function didn't work!" , error);
//     return;
//   }

//   fetchCoordsByIP(ip, (error, coordinates) => {
//     if (error) {
//       console.log("The fetchCoordsByIP function didn't work!", error);
//       return;
//     }
    
//     fetchISSFlyOverTimes(coordinates, (error, passTimes) => {
//       if (error) {
//         console.log("The fetchISSFlyOverTimes function didn't work!", error);
//         return;
//       }

//       console.log(passTimes);
//     });
//   });
  
// });

const { nextISSTimesForMyLocation } = require('./iss');

const printPassTimes = function(passTimes) {
  for (let passTime of passTimes) {
    const dateTime = new Date(0);
    dateTime.setUTCSeconds(passTime.risetime);
    const output = `Next pass at ${dateTime} for ${passTime.duration} seconds!`;
    console.log(output);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});