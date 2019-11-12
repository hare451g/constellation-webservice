const moment = require('moment');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// models
const BankModels = require('../bank/model');
const UserProfileModel = require('./model');

// constants
const status = require('../../utils/constants');

// utils
const crud = require('../../utils/crud');
const blockchain = require('../../utils/blockchain');

async function createNewProfile(req, res) {
  try {
    const {
      account_number: accountNumber,
      bank_code: bankCode,
      pin
    } = req.body;

    // get bank by bank code
    const bank = await crud.getDocument(BankModels, { code: bankCode });

    if (!bank) {
      throw { messsage: 'invalid bank code' };
    }

    // encrypt pin
    const encryptedPin = await bcrypt.hash(`${pin}`, 4);

    // get generated address from web3
    const seed = await blockchain.createSeed(
      bankCode,
      accountNumber,
      encryptedPin
    );

    const address = await blockchain.getAddress(seed);

    if (!address) {
      throw { messsage: 'could not create address !' };
    }

    // activate account
    const activation = await blockchain.activation(
      bankCode,
      accountNumber,
      encryptedPin
    );

    if (!activation) {
      throw { messsage: 'could not activate address !' };
    }

    // create new userprofile
    const query = new UserProfileModel({
      account_number: accountNumber,
      bank: bank._id,
      pin: encryptedPin,
      address
    });

    // perform save query
    const saved = await query.save();

    res.status(201).json({
      data: {
        userprofile: saved
      }
    });
  } catch (error) {
    res.status(status.HTTP_STATUS.ERROR).json(error);
  }
}

async function obtainToken(req, res) {
  try {
    const { account_number: accountNumber, pin } = req.body;

    const user = await crud.getDocument(UserProfileModel, {
      account_number: accountNumber
    });

    if (!user) {
      throw { messages: 'user not found' };
    }

    // compare hash
    const match = await bcrypt.compare(pin, user.pin);

    if (match) {
      // generate json web token
      const token = jwt.sign({ user }, process.env.JWT_SECRET);

      res.status(200).json({
        id: user.id,
        authorization: `JWT ${token}`
      });
    } else {
      res.status(403).json({
        messages: 'account_number and pin did not match'
      });
    }
  } catch (error) {
    res.status(422).json(error);
  }
}

async function fetchAllProfiles(req, res) {
  try {
    const userprofile = await UserProfileModel.find().populate('bank');
    res.status(status.HTTP_STATUS.SUCCESS).json({
      list: userprofile
    });
  } catch (error) {
    res.status(status.HTTP_STATUS.ERROR).json(error);
  }
}

async function fetchOneProfile(req, res) {
  try {
    const id = req.params.id;
    const userprofile = await UserProfileModel.findById(id).populate('bank');
    res.status(status.HTTP_STATUS.SUCCESS).json(userprofile);
  } catch (err) {
    res.status(status.HTTP_STATUS.ERROR).json(err);
  }
}

async function updateProfile(req, res) {
  try {
    const id = req.params.id;

    const userprofile = await UserProfileModel.findByIdAndUpdate(id, {
      ...req.body,
      updated_at: moment()
    });

    if (!userprofile) {
      throw 'userprofile is not found!';
    }

    res.status(status.HTTP_STATUS.SUCCESS).json(userprofile);
  } catch (error) {
    res
      .status(status.HTTP_STATUS.ERROR)
      .json({ messsage: 'malformed request', error: `${error}` });
  }
}

async function deleteProfile(req, res) {
  try {
    const id = req.params.id;

    const deleted = await UserProfileModel.findByIdAndDelete(id);

    res.status(status.HTTP_STATUS.SUCCESS).json(deleted);
  } catch (error) {
    res
      .status(status.HTTP_STATUS.ERROR)
      .json({ messsage: 'malformed request', error });
  }
}

module.exports = {
  createNewProfile,
  obtainToken,
  fetchAllProfiles,
  fetchOneProfile,
  updateProfile,
  deleteProfile
};
