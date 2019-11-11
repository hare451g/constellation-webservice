const express = require('express');
const router = express.Router();

// import transaction services from services
const {
  createNewTx,
  fetchAllTx,
  fetchOneTx,
  updateTx,
  deleteTx
} = require('./functions');

// define the home page route
router.post('/transaction/', createNewTx);
router.get('/', fetchAllTx);
router.get('/:id', fetchOneTx);
router.put('/:id', updateTx);
router.delete('/:id', deleteTx);

module.exports = router;
