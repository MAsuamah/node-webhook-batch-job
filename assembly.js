const axios = require("axios");
require('dotenv').config()

const assembly = axios.create({
    baseURL: "https://api.assemblyai.com/v2",
    headers: {
        authorization: process.env.AAI_KEY,
        "content-type": "application/json",
    },
    maxContentLength: Infinity,
    maxBodyLength: Infinity
});

module.exports = { assembly }