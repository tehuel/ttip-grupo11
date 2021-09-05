// eslint-disable-next-line no-unused-vars
const dotenv = require("dotenv").config();

module.exports = {
  NODE_ENV: process.env.NODE_ENV || "development",
  HOST: process.env.HOST || "127.0.0.1",
  PORT: process.env.PORT || 3000,
  MONGO_URL: process.env.MONGO_URL,
};
