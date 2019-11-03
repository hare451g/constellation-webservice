const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const userMandiriRoutes = require('./routes/user_mandiri.routes');
const bankService = require('./services/bank');
const bcaService = require('./services/bca');
const authService = require('./services/auth');

// initialize express app
const app = express();

// tell express to use cors
app.use(cors());
app.options('*', cors());

// tell express to use body parser
app.use(bodyParser.json());

app.use('/user_mandiri', userMandiriRoutes);

app.use('/bca', bcaService);
app.use('/banks', bankService);
app.use('/auth', authService);

module.exports = app;
