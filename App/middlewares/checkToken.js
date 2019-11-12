require('dotenv').config();

const jwt = require('jsonwebtoken');

const UserProfileModel = require('../services/userprofile/model');

async function checkToken(req, res, next) {
  try {
    const authorization = req.headers['authorization'] || '';

    if (!authorization.startsWith('JWT ')) {
      throw { message: 'authorization token is required' };
    }
    const token = authorization.slice(4, authorization.length);

    if (!token) {
      throw { message: 'Forbidden access' };
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      throw { message: 'invalid token!' };
    }

    const user = await UserProfileModel.findById(decoded.user._id);
    if (!user) {
      throw { message: 'invalid user!' };
    }

    req.user = decoded.user;

    next();
  } catch (error) {
    res.status(403).json(error);
  }
}

module.exports = checkToken;
