const moment = require('moment');
const bcrypt = require('bcrypt');

// models
const BankModels = require('../bank/model');
const UserProfileModel = require('../userprofile/model');
const TxModel = require('./model');

// utils
const crud = require('../../utils/crud');
const blockchain = require('../../utils/blockchain');

async function createNewTransaction(req, res) {
  try {
    const { amount, to } = req.body;
    const { _id: from } = req.user;

    const targetUser = await UserProfileModel.findById(to);
    if (!targetUser) {
      throw { message: 'Could not find target User!' };
    }

    const fromUser = await UserProfileModel.findById(from).populate('bank');
    if (!fromUser) {
      throw { message: 'Could not find from User!' };
    }

    const seed = await blockchain.createSeed(
      fromUser.bank.code,
      fromUser.account_number,
      fromUser.pin
    );

    const tx = new TxModel({ amount, from, to });
    const savedTx = await tx.save();

    if (!savedTx) {
      throw { message: 'Could not save tx! ' };
    }

    const selectedTx = await TxModel.findById(savedTx.id).populate([
      { path: 'from', populate: { path: 'bank' } },
      { path: 'to', populate: { path: 'bank' } }
    ]);

    if (!selectedTx) {
      throw { message: 'Could not select Tx! ' };
    }

    const performedTx = await blockchain.transferSameCurrency(
      selectedTx.from.bank.code,
      selectedTx.from.account_number,
      selectedTx.from.pin,
      amount,
      selectedTx.to.bank.code,
      selectedTx.to.account_number
    );

    if (!performedTx) {
      throw { message: 'Failed to perform transactions!' };
    }

    res.status(201).json({ performedTx });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

module.exports = { createNewTransaction };
