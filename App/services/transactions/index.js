const express = require('express');
const router = express.Router();
const checkToken = require('../../middlewares/checkToken');

// import todo services from services
const { createNewTransaction } = require('./functions');

// public routes
router.post('/', checkToken, createNewTransaction);

module.exports = router;
