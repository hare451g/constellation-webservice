require('dotenv').config();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const AuthModel = require('./model');

async function initializeAuth(req, res) {
  const { user_id, account_number, pin } = req.body;

  try {
    const encryptedPin = await bcrypt.hash(`${pin}`, 4);

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

    const user = await AuthModel.findOne({ account_number }).populate(
      'userprofile'
    );

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
        account_number: user.account_number,
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

module.exports = {
  initializeAuth,
  obtainToken,
  deleteAuth
};
