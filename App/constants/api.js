require('dotenv').config();

const { HOST, PORT, ENVIRONMENT } = process.env;

let BASE_API_URL = `${HOST}:${PORT}`;

if (ENVIRONMENT === 'production') {
  BASE_API_URL = HOST;
}

module.exports = {
  HOST,
  PORT,
  BASE_API_URL
};
