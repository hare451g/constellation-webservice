const express = require('express');
const router = express.Router();
// import todo services from services
const {
  createNewBank,
  fetchAllBanks,
  fetchOneBank,
  updateBank,
  deleteBank
} = require('../services/bankServices');

// define the home page route
router.post('/', createNewBank);
router.get('/', fetchAllBanks);
router.get('/:id', fetchOneBank);
router.put('/:id', updateBank);
router.delete('/:id', deleteBank);

module.exports = router;
