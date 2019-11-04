// require to read .env file
require('dotenv').config();

// setup express js
const app = require('./App');

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
);
