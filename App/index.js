const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const bankService = require('./services/bank');
const bankAccountService = require('./services/bank_account');
const authService = require('./services/auth');
const userprofileService = require('./services/userprofile');
const transactionService = require('./services/transaction');
const transactionsService = require('./services/transactions');

// initialize express app
const app = express();

// tell express to use cors
app.use(cors());
app.options('*', cors());

// tell express to use body parser
app.use(bodyParser.json());

app.use('/accounts', bankAccountService);
app.use('/banks', bankService);
app.use('/auth', authService);
app.use('/user-profile', userprofileService);
app.use('/transaction', transactionsService);
app.use('/transactions', transactionService);

module.exports = app;
