const express = require('express');
const router = express.Router();

const { initializeAuth, obtainToken, deleteAuth } = require('./functions');

router.post('/initialize', initializeAuth);
router.post('/obtain-token', obtainToken);
router.delete('/destroy/:id', deleteAuth);

module.exports = router;
