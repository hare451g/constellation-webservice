const moment = require('moment');
const axios = require('axios');

const { BASE_API_URL } = require('../../constants/api');

const BankAccountModel = require('./model');
const status = require('../../utils/constants');

async function createNewAccount(req, res) {
  try {
    const { username, pin, account_number, balance, currency, bank } = req.body
    //console.log(bank)
    const response = await axios.get(`${BASE_API_URL}/banks/code/${bank}`);
    if (!response.data) {
      throw { message: "invalid bank code"};
    }
    console.log(response)

    // get bank by bank code
    const query = new BankAccountModel({username, pin, account_number, balance, currency, bank: response.data._id});
    console.log(query)
    query.save((err, query) => {
      if (err) {
        res.status(status.HTTP_STATUS.ERROR).json(err);
      }
      res.status(status.HTTP_STATUS.SUCCESS).json(query);
    });
  } catch (error) {
    res
      .status(status.HTTP_STATUS.ERROR)
      .json({ messsage: 'malformed request', error: `${error}` });
  }
}

async function fetchAllAccounts(req, res) {
  try {
    const accounts = await BankAccountModel.find();
    if (accounts === null) {
      res.status(status.HTTP_STATUS.SUCCESS).json();
    }
    res.status(status.HTTP_STATUS.SUCCESS).json(accounts);
  } catch (error) {
    res.status(status.HTTP_STATUS.ERROR).json(error);
  }
}

async function fetchOneAccount(req, res) {
  const id = req.params.id;
  BankAccountModel.findById(id, (err, result) => {
    if (err) {
      res.status(status.HTTP_STATUS.ERROR).json(err);
    }
    if (result === null) {
      res
        .status(status.HTTP_STATUS.NOT_FOUND)
        .json({ message: 'not found', id });
    }
    res.status(status.HTTP_STATUS.SUCCESS).json(result);
  });
}

async function fetchOneAccountByNumber(req, res) {
  try {
    const account_number = req.params.account_number;
    const account = await BankAccountModel.findOne({ account_number });

    if (account) {
      res.status(status.HTTP_STATUS.SUCCESS).json(account);
    } else {
      res.status(status.HTTP_STATUS.NOT_FOUND).json(account)
    }
  } catch (err) {
    res.status(status.HTTP_STATUS.ERROR).json(err);    
  }
}


async function updateAccount(req, res) {
  try {
    const id = req.params.id;
    BankAccountModel.findById(id, (err, result) => {
      if (err) {
        res
          .status(status.HTTP_STATUS.NOT_FOUND)
          .json({ message: 'Not found !' });
      }
      if (req.body.username != null) {
        result.username = req.body.username || result.username;
      }
      if (req.body.pin != null) {
        result.pin = req.body.pin || result.pin;
      }
      if (req.body.account_number != null) {
        result.account_number =
          req.body.account_number || result.account_number;
      }
      if (req.body.balance != null) {
        result.balance = req.body.balance || result.balance;
      }

      (result.updated_at = moment()),
        result.save((err, updated) => {
          if (err) {
            res.status(status.HTTP_STATUS.ERROR).json(err);
          }
          res.status(status.HTTP_STATUS.SUCCESS).json(updated);
        });
    });
  } catch (error) {
    res
      .status(status.HTTP_STATUS.ERROR)
      .json({ messsage: 'malformed request', error: `${error}` });
  }
}

async function deleteAccount(req, res) {
  const id = req.params.id;
  BankAccountModel.findByIdAndDelete(id, (err, result) => {
    if (err) {
      res.status(status.HTTP_STATUS.ERROR).json(err);
    }
    res.status(status.HTTP_STATUS.SUCCESS).json(result);
  });
}

module.exports = {
  createNewAccount,
  fetchAllAccounts,
  fetchOneAccount,
  fetchOneAccountByNumber,
  updateAccount,
  deleteAccount
};
