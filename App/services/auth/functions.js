require('dotenv').config();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const status = require('../../utils/constants');

const AuthModel = require('./model');

async function initializeAuth(req, res) {
  const { account_number, pin, user_id } = req.body;

  try {
    const encryptedPin = await bcrypt.hash(`${pin}`, 8);

    const newAuth = new AuthModel({
      account_number,
      pin: encryptedPin,
      userprofile: user_id
    });

    const saved = await newAuth.save();

    res.status(200).json({ data: saved });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

async function obtainToken(req, res) {
  try {
    const { account_number, pin } = req.body;

    const userprofile = await AuthModel.findOne({ account_number });
    if (!userprofile) {
      throw { messages: 'user not found' };
    }

    // compare hash
    const match = await bcrypt.compare(pin, userprofile.pin);

    if (match) {
      // generate json web token
      const token = jwt.sign({ userprofile }, process.env.JWT_SECRET);

      res.status(200).json({
        id: userprofile._id,
        account_number: userprofile.account_number,
        authorization: token,
        type: 'JWT'
      });
    } else {
      res.status(403).json({
        messages: 'account_number and pin did not match'
      });
    }
  } catch (error) {
    res.status(400).json(error);
  }
}

async function deleteAuth(req, res) {
  try {
    const id = req.params.id;

    const deleted = await AuthModel.findByIdAndDelete(id);

    res.status(200).json(deleted);
  } catch (error) {
    res.status(422).json({ messsage: 'malformed request', error });
  }
}

async function findAllAuth(req, res) {
  try {
    const auth = await AuthModel.find().populate('userprofile')
    res.status(status.HTTP_STATUS.SUCCESS).json({
      list: auth
    });
  } catch (error) {
    res.status(status.HTTP_STATUS.ERROR).json(error);
  }
}

module.exports = {
  initializeAuth,
  obtainToken,
  deleteAuth,
  findAllAuth
};