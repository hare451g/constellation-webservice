const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const userBcaRoutes = require('./routes/user_bca.routes');
const userMandiriRoutes = require('./routes/user_mandiri.routes');

const authService = require('./services/auth');

// initialize express app
const app = express();

// tell express to use cors
app.use(cors());
app.options('*', cors());

// tell express to use body parser
app.use(bodyParser.json());

app.use('/user_bca', userBcaRoutes);
app.use('/user_mandiri', userMandiriRoutes);

app.use('/auth', authService);

module.exports = app;
