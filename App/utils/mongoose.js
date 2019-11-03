require('dotenv').config();
const mongoose = require('mongoose');

const {
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_NAME,
  DATABASE_CLUSTER
} = process.env;

const host = `${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_CLUSTER}`;
const options = 'retryWrites=true&w=majority';
const url = `mongodb+srv://${host}/${DATABASE_NAME}?${options}`;

mongoose.connect(url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('MongoDB status: connected !');
});

module.exports = mongoose;
