const mongoose = require('../utils/configs');

const banksSchema = require('../schemas/bankSchema');

const userBcaModel = mongoose.model('banks', banksSchema);

module.exports = userBcaModel;
