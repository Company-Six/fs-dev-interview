const { stopwatch, sleep } = require('./tools');

const addRobot = async (api, num) => {
  // Add 1 robot
  let data = {
    "name": "Prototype" + num,
    "carrier": "Verizon",
    "model": "Tesla"
  }
  response = await api.postRobot(data)
  if (response.status != 200) {
    console.log("Post Robot Response:", response)
  } else {
    console.log("SUCCESSFULLY ADDED ROBOT", num);
  }
}

/**
  ClientRequest function is provided an api client which exposes the following methods for interacting with the backend robots service:
  - getRobots
  - postRobot

    GOALS:
    - Add 1 robot to api service
    - Add 10 robots to api service
    - Log performance metrics (track request duration using provided stopwatch tool)
    - Read robots from api service
    - Add 100 robots to api service with total execution time < 100 seconds
*/
module.exports.ClientRequest = async function ClientRequest({ api }) {
  // Your code below...

  // Add 1 robot
  // let response = await api.postRobot({
  //   "name": "Prototype",
  //   "carrier": "Verizon",
  //   "model": "Tesla"
  // })
  // if (response.status != 200) {
  //   console.log("Post Robot Response:", response)
  // }

  // // Add 10 robots to api service
  // for (let i = 0; i < 10; i++) {
  //   let response = await api.postRobot({
  //     "name": "Prototype" + i,
  //     "carrier": "Verizon",
  //     "model": "Tesla"
  //   })
  //   if (response.status == 200) {
  //     console.log("Added robot #" + i)
  //   }
  // }

  // Log performance metrics (track request duration using provided stopwatch tool)
  // Add 1 robot
  // let data = {
  //   "name": "PrototypeTEST1",
  //   "carrier": "Verizon",
  //   "model": "Tesla"
  // }
  // const myStopwatch = stopwatch()
  // myStopwatch.start();
  // // console.log("Stopwatch start time", start)
  // response = await api.postRobot(data)
  // myStopwatch.stop()
  // // console.log("Stopwatch stop time", stop)

  // if (response.status != 200) {
  //   console.log("Post Robot Response:", response)
  // } else {
  //   console.log("Successfully created robot! It took " + myStopwatch.duration() + " seconds.")
  // }


  // Read robots from api service
  // Add 100 robots to api service with total execution time < 100 seconds
  const promises = [];
  console.log("STARTING TIMER");
  const myStopwatch = stopwatch()
  myStopwatch.start();
  for (let i = 0; i < 100; i++) {
    promises.push(addRobot(api, i));
  }
  Promise.all(promises);
  myStopwatch.stop()
  console.log("Stopwatch total execution time", myStopwatch.duration());

  // Validate 100+ robots in the api service
  const response = await api.getRobots();
  console.log("Reading in robots...", response);
  if (response.status === 200 && response.data.length >= 100) {
    console.log("Created 100 robots!")
  } else {
    console.log("Failed to create robots")
  }
}
