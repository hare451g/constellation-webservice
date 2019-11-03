const express = require('express');
const router = express.Router();

const { initializeAuth, obtainToken } = require('./functions');

router.post('/initialize', initializeAuth);
router.post('/obtain-token', obtainToken);

module.exports = router;
