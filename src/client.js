const { stopwatch, sleep } = require('./tools');

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

let RobotTemplate = {
  carrier: 'ORANGE',
  model: 'RS42',
  serial: "SRL-281u51235",
  secret: "Passwrd",
  name: "RobE",
};

function addRobot(i, api) {
  return new Promise((resolve, reject) => {
    let robot = {...RobotTemplate}
    robot.name = `${RobotTemplate.name}-${i}`;
    console.log(`Adding Robot: ${robot.name}`)
    const response = api.postRobot(robot).then(response => {
    console.log(`Request Status: ${response.status}`)
      resolve(response);
    })
  })
}

module.exports.ClientRequest = async function ClientRequest({ api }) {
  // console.log(`Making 100 requests`)
  
  let promises = []
  for (let i = 0; i <= 100; i++){
    promises.push(addRobot(i, api))
  }
  await Promise.all(promises);
  
  const {data} = await api.getRobots();
  console.log({data})
}