// require to read .env file
require('dotenv').config();

// setup express js
const app = require('./App');

app.listen(process.env.SERVER_PORT, () =>
  console.log(`Example app listening on port ${process.env.SERVER_PORT}!`)
);
