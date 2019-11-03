const mongoose = require('../../utils/mongoose');

const bankSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    code: { type: String, required: true, unique: true },
    available_currencies: { type: String }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

const BankModel = mongoose.model('bank', bankSchema);

module.exports = BankModel;
