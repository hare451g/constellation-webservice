require('dotenv').config();
const url = "mongodb+srv://auth_service:56OnoO7AD9iI5zmk@cluster0-ky5wb.mongodb.net/test?retryWrites=true&w=majority"

const mongoose  = require('mongoose');
mongoose.connect(url, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('MongoDB status: connected !');
});

module.exports = mongoose;