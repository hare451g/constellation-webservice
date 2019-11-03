const express = require('express');
const router = express.Router();
// import todo services from services
const UserBcaServices = require('./functions');

// define the home page route
router.post('/', UserBcaServices.createNewUser);
router.get('/', UserBcaServices.fetchAllUser);
router.get('/:id', UserBcaServices.fetchOneUser);
router.put('/:id', UserBcaServices.updateUser);
router.delete('/:id', UserBcaServices.deleteUser);

module.exports = router;
