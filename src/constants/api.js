require('dotenv').config();

const HOST = process.env.SERVER_HOST;
const PORT = process.env.SERVER_PORT;

const BASE_API_URL = `http://${HOST}:${PORT}`;

module.exports = {
  HOST,
  PORT,
  BASE_API_URL
};
