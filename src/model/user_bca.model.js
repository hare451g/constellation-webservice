const mongoose = require('../utils/configs');

const userBcaSchemas = require('../schemas/user_bca.schemas');

const userBcaModel = mongoose.model('user_bca', userBcaSchemas);

module.exports = userBcaModel;