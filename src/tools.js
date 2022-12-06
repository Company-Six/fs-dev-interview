/**
	Stopwatch factory to generate instances to keep track of elapsed time in seconds
	1. const watch = stopwatch()
	2. watch.start()
	3. watch.stop()
    4. watch.duration() -> spanned time in seconds
*/
module.exports.stopwatch = function stopwatch() {
	let duration = 0;
	let start = 0;
	return {
		start: () => start === 0 ? start = Date.now() : duration,
		stop: () => duration === 0 ? duration = Date.now() - start : duration,
		duration: () => duration / 1000,
	};
}
module.exports.sleep = function sleep(time) {
	return new Promise(resolve => setTimeout(resolve, time * 1000));
}