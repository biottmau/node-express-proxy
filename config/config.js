require("dotenv").config();
const http = require("http");
const https = require("https");

const env = process.env.ENVIRON;

const PORT = process.env.PORT;

const mHttps = (process.env[env+".proxy.http"] == "http")?http:https;

module.exports = {
  app: {
    port: PORT,
  },
  proxy: {
    host: process.env[env+".proxy.host"],
    port: process.env[env+".proxy.port"],
    http: mHttps,
  },
};
