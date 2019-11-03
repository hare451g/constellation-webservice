const express = require('express');
const router = express.Router();
// import todo services from services
const {
  createNewProfile,
  fetchAllProfiles,
  fetchOneProfile,
  updateProfile,
  deleteProfile
} = require('./functions');

// define the home page route
router.post('/', createNewProfile);
router.get('/', fetchAllProfiles);
router.get('/:id', fetchOneProfile);
router.put('/:id', updateProfile);
router.delete('/:id', deleteProfile);

module.exports = router;
