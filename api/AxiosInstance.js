const axios = require('axios');

let createInstance = function (token) {
    return axios.create({
        baseURL: 'https://slack.com/api/',
        timeout: 3000,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json; charset=utf-8',
        }
    });
}

module.exports = createInstance;
