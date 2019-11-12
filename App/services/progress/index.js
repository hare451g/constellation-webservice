const express = require('express');
const router = express.Router();

// import progress services from services
const {
  createNewProgress,
  fetchAllProgresses,
  fetchOneProgress,
  updateProgress,
  deleteProgress
} = require('./functions');

// define the home page route
router.post('/', createNewProgress);
router.get('/', fetchAllProgresses);
router.get('/:id', fetchOneProgress);
router.put('/:id', updateProgress);
router.delete('/:id', deleteProgress);

module.exports = router;
