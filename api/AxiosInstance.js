const axios = require('axios');

let createInstance = function (token) {
    return axios.create({
        baseURL: 'https://slack.com/api/',
        timeout: 3000,
        headers: { 'Authorization': `Bearer ${token}` }
    });
}

module.exports = createInstance;
