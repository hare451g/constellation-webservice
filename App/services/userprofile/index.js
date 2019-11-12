const express = require('express');
const router = express.Router();
const checkToken = require('../../middlewares/checkToken');

// import todo services from services
const {
  createNewProfile,
  obtainToken,
  fetchAllProfiles,
  fetchOneProfile,
  updateProfile,
  deleteProfile
} = require('./functions');

// public routes
router.post('/', createNewProfile);
router.post('/obtain-token', obtainToken);

// protected routes
router.get('/', checkToken, fetchAllProfiles);
router.get('/:id', checkToken, fetchOneProfile);
router.put('/:id', checkToken, updateProfile);
router.delete('/:id', checkToken, deleteProfile);

module.exports = router;
