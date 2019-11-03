const mongoose = require('../../utils/configs');

const bankSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, unique: true },
  code: { type: String, required: true, unique: true },
  available_currencies: { type: String },
  created_at: Date,
  updated_at: Date
});

const userBcaModel = mongoose.model('banks', bankSchema);

module.exports = userBcaModel;
module.exports = {
  bankSchema
};
