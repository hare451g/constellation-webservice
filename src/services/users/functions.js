const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('./model');

const signUp = async (req, res) => {
  const { username, password } = req.body;

  try {
    // encrypt
    const encryptedPassword = await bcrypt.hash(password, 4);

    UserModel({
      username,
      password: encryptedPassword,
      is_deleted: false
    }).save((err, result) => {
      if (err) {
        res.status(500).json({ messages: `${err}` });
      }
      res.status(200).json({ data: result });
    });
  } catch (error) {
    res.status(500).json({ messages: 'error when encrypting password' });
  }
};

const signIn = async (req, res) => {
  const { username, password } = req.body;

  const user = await UserModel.findOne({ username });

  if (!user) {
    res.status(403).json({
      messages: 'user not found'
    });
  }

  try {
    // compare hash
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      // generate json web token
      const token = jwt.sign({ user }, 'rahasia dong');
      res.status(200).json({
        id: user.id,
        username: user.username,
        authorization: token,
        type: 'JWT'
      });
    }

    res.status(403).json({
      messages: 'username and password did not match'
    });
  } catch (error) {
    res.status(500).json({ messages: 'error when comparing hash' });
  }
};

const getUser = async (req, res) => {
  const { user } = req;

  if (!user) {
    return res.status(400).json({ messages: 'Id is not provided' });
  }

  const profile = await UserModel.findById(user._id);

  if (!profile) {
    res.status(400).json({ messages: 'user not found ' });
  }

  res.status(200).json({ data: profile });
};

module.exports = {
  signUp,
  signIn,
  getUser
};
