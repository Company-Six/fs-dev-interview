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
module.exports.ClientRequest = async function ClientRequest({ api }) {
	const watch = stopwatch();
	const robots = generateRobots('ATT', 'RS', 100);

	// await sequenceAdd(robots, api);
	await parallelAdd(robots, api, { concurrency: 30, pause: 10 });

	// const newRobots = await api.getRobots();
	// console.log(newRobots.data);
}

async function parallelAdd(robots, api, { concurrency, pause }) {
	if (concurrency < 1) {
		throw new Error('0 means nothing is running');
	}
	const parallelWatch = stopwatch();
	parallelWatch.start();

	const tasks = robots.map(r => api.postRobot(r));
	const taskBatches = batchAsyncTasks(tasks, concurrency);

	for (const taskBatch of taskBatches) {
		const watch = stopwatch();
		watch.start();
		await Promise.all(taskBatch);
		watch.stop();
		await sleep(pause);
		console.log(taskBatch.length, ' tasks took ', watch.duration(), ' seconds to process');
	}
	parallelWatch.stop();
	console.log('Parallel add took ', parallelWatch.duration(), ' seconds');
}

async function sequenceAdd(robots, api) {
	const sequenceWatch = stopwatch();
	sequenceWatch.start();
	for (const robot of robots) {
		const watch = stopwatch();
		watch.start();
		const res = await api.postRobot(robot);
		watch.stop();
		console.log(res.data, ' took ', watch.duration(), ' seconds to request');
	}
	sequenceWatch.stop();
	console.log('Sequence add took ', sequenceWatch.duration(), ' seconds');
}
}