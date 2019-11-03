const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const mandiriServices = require('./services/mandiri');
const bankService = require('./services/bank');
const bcaService = require('./services/bca');
const authService = require('./services/auth');
const userprofileService = require('./services/userprofile');

// initialize express app
const app = express();

// tell express to use cors
app.use(cors());
app.options('*', cors());

// tell express to use body parser
app.use(bodyParser.json());

app.use('/user_mandiri', mandiriServices);
app.use('/user_bca', bcaService);
app.use('/banks', bankService);
app.use('/auth', authService);
app.use('/user-profile', userprofileService);

module.exports = app;
