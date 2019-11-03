require('dotenv').config();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const AuthModel = require('./model');

async function initializeAuth(req, res) {
  const { address, pin } = req.body;

  try {
    const encryptedPin = await bcrypt.hash(pin, 4);

    const newAuth = new AuthModel({ address, pin: encryptedPin });

    const saved = await newAuth.save();

    res.status(200).json({ data: saved });
  } catch (error) {
    res.status(500).json(error);
  }
}

async function obtainToken(req, res) {
  try {
    const { address, pin } = req.body;

    const user = await AuthModel.findOne({ address });

    if (!user) {
      res.status(403).json({ messages: 'user not found' });
    }

    // compare hash
    const match = await bcrypt.compare(pin, user.pin);

    if (match) {
      // generate json web token
      const token = jwt.sign({ user }, process.env.JWT_SECRET);

      res.status(200).json({
        id: user.id,
        address: user.address,
        authorization: token,
        type: 'JWT'
      });
    } else {
      res.status(403).json({
        messages: 'address and pin did not match'
      });
    }
  } catch (error) {
    res.status(500).json({ messages: 'error when comparing hash' });
  }
}

module.exports = {
  initializeAuth,
  obtainToken
};
