const moment = require('moment');
const axios = require('axios');

const { BASE_API_URL } = require('../../constants/api');

const status = require('../../utils/constants');
const checkToken = require('../../middlewares/checkToken')

const TransactionModel = require('./model');


async function createNewTx(req, res, next) {
  try {
    const { amount, currency, user_id } = req.body;

    // id = parseInt(user_id);
    console.log(`id:${user_id}`)
    // get bank account by account number
    // const get_account = await axios.get(`${BASE_API_URL}/accounts/${account_number}`);
    // if (!get_account.data) {
    //   throw { message: 'invalid account number' };
    // }
    const get_user = await axios.get(`${BASE_API_URL}/user-profile/${user_id}`);
    if (!get_user.data) {
      throw { message: 'invalid account number' };
    }

    const query = new TransactionModel({
      amount,
      currency,
      from: checkToken(req, res, next),
      to: get_user.data.userprofile._id,
    });

    const saved = await query.save();

    if (saved) {
      const authResponse = await axios.post(`${BASE_API_URL}/auth/initialize`, {
        account_number,
        user_id: saved._id,
        pin
      });

      if (authResponse.data) {
        res.status(status.HTTP_STATUS.SUCCESS).json(saved);
      } else {
        throw { messsage: 'error when initialize auth' };
      }
    } else {
      throw { messsage: 'error when creating transaction' };
    }
  } catch (error) {
    console.log(error);
    res.status(status.HTTP_STATUS.ERROR).json(error);
  }
}

async function fetchAllTx(req, res) {
  try {
    const transaction = await TransactionModel.find();
    res.status(status.HTTP_STATUS.SUCCESS).json({
      list: transaction
    });
  } catch (error) {
    res.status(status.HTTP_STATUS.ERROR).json(error);
  }
}

async function fetchOneTx(req, res) {
  try {
    const id = req.params.id;
    const transaction = await TransactionModel.findById(id).populate('from', 'to');
    res.status(status.HTTP_STATUS.SUCCESS).json(transaction);
  } catch (err) {
    res.status(status.HTTP_STATUS.ERROR).json(err);
  }
}

async function updateTx(req, res) {
  try {
    const id = req.params.id;

    const transaction = await TransactionModel.findByIdAndUpdate(id, {
      ...req.body,
      updated_at: moment()
    });

    if (!transaction) {
      throw 'transaction is not found!';
    }

    res.status(status.HTTP_STATUS.SUCCESS).json(transaction);
  } catch (error) {
    res
      .status(status.HTTP_STATUS.ERROR)
      .json({ messsage: 'malformed request', error: `${error}` });
  }
}

async function deleteTx(req, res) {
  try {
    const id = req.params.id;

    const deleted = await TransactionModel.findByIdAndDelete(id);

    res.status(status.HTTP_STATUS.SUCCESS).json(deleted);
  } catch (error) {
    res
      .status(status.HTTP_STATUS.ERROR)
      .json({ messsage: 'malformed request', error });
  }
}

module.exports = {
  createNewTx,
  fetchAllTx,
  fetchOneTx,
  updateTx,
  deleteTx
};
