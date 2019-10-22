require('dotenv').config();

const mongoose = require('mongoose');

if (process.env.ENVIRONTMENT === 'PRODUCTION') {
  mongoose.connect(
    `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@cluster0-ky5wb.mongodb.net/test?retryWrites=true&w=majority`,
    { useNewUrlParser: true }
  );
} else {
  mongoose.connect(
    `mongodb://${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`,
    { useNewUrlParser: true }
  );
}

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('MongoDB status: connected !');
});

module.exports = mongoose;
