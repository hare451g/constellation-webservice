require('dotenv').config();

const jwt = require('jsonwebtoken');

const checkToken = (req, res, next) => {
  const authorization = req.headers['authorization'] || '';

  if (authorization.startsWith('JWT ')) {
    const token = authorization.slice(7, authorization.length);

    if (!token) {
      res.status(403).json({
        messages: 'Forbidden access'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded) {
      req.user = decoded.user;
      next();
    }
  } else {
    res.status(403).json({
      messages: 'Authorization token is must be provided'
    });
  }
};

module.exports = checkToken;
