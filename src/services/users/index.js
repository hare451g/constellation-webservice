const express = require('express');
const router = express.Router();

const { checkToken } = require('../../middlewares/auth');

const { signUp, signIn, getUser } = require('./functions');

router.post('/signup', signUp);
router.post('/signin', signIn);

// protected
router.get('/profile', checkToken, getUser);

module.exports = router;
