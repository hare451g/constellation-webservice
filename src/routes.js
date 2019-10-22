const express = require('express');
const router = express.Router();

// services
const users = require('./services/users');

router.use('/users', users);

module.exports = router;
