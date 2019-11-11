const express = require('express');
const router = express.Router();

const { findAllAuth, initializeAuth, obtainToken, deleteAuth } = require('./functions');

router.get('/get-auth', findAllAuth);
router.post('/initialize', initializeAuth);
router.post('/obtain-token', obtainToken);
router.delete('/destroy/:id', deleteAuth);

module.exports = router;
