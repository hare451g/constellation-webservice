// require to read .env file
const mongoose = require('../utils/configs');

const bankSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  code: { type: String, required: true },
  available_currencies: { type: String, required: true, unique: true },
  created_at: Date,
  updated_at: Date
});

module.exports = bankSchema;
