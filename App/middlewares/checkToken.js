require('dotenv').config();

const jwt = require('jsonwebtoken');

const checkToken = async (req, res, next) => {
  const authorization = req.headers['authorization'] || '';

  if (authorization.startsWith('JWT ')) {
    const token = authorization.slice(4, authorization.length);

    if (!token) {
      res.status(403).json({
        messages: 'Forbidden access'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userprofile = await AuthToken.findOne({_id:decoded._id})
    if (userprofile) {
      req.userprofile = userprofile;
      next();
    }
  } else {
    res.status(403).json({
      messages: 'Authorization token is must be provided'
    });
  }
};

module.exports = checkToken;
