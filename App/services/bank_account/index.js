const express = require('express');
const router = express.Router();
// import todo services from services
const BankAccountServices = require('./functions');

// define the home page route
router.post('/', BankAccountServices.createNewAccount);
router.get('/', BankAccountServices.fetchAllAccounts);
router.get('/:id', BankAccountServices.fetchOneAccount);
router.get('/account_number/:account_number', BankAccountServices.fetchOneAccountByNumber)
router.put('/:id', BankAccountServices.updateAccount);
router.delete('/:id', BankAccountServices.deleteAccount);

module.exports = router;
