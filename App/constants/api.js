require('dotenv').config();

const { HOST, PORT } = process.env;

let BASE_API_URL = `http://${HOST}:${PORT}`;

if (process.env.ENVIRONMENT === 'production') {
  BASE_API_URL = HOST;
}

module.exports = {
  HOST,
  PORT,
  BASE_API_URL
};
