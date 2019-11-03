const mongoose = require('../utils/configs');

const userMandiriSchemas = require('../schemas/user_mandiri.schemas');

const userMandiriModel = mongoose.model('user_mandiri', userMandiriSchemas);

module.exports = userMandiriModel;