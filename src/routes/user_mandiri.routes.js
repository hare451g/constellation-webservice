const express = require('express');
const router = express.Router();
// import todo services from services
const UserMandiriServices = require('../services/user_mandiri.services');

// define the home page route
router.post('/', UserMandiriServices.createNewUser);
router.get('/', UserMandiriServices.fetchAllUser);
router.get('/:id', UserMandiriServices.fetchOneUser);
router.put('/:id', UserMandiriServices.updateUser);
router.delete('/:id', UserMandiriServices.deleteUser);

module.exports = router;
