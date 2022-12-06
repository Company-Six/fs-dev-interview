/**
DO NOT TOUCH THIS FILE
*/

// API hosted in a repl.it repo https://github.com/Company-Six/fs-dev-interview-backend
const BASE_API_URL = 'https://API-Service.nickvinson1.repl.co';
const axios = require('axios');

const { ClientRequest } = require('./src/client');

ClientRequest({
	api: {
		getRobots: () => axios.get(`${BASE_API_URL}/robots`),
		postRobot: (robot) => axios.post(`${BASE_API_URL}/robot`, robot),
	},
});