const mongoose = require('../../utils/mongoose');

const bankSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    code: { type: String, required: true, unique: true },
    available_currencies: { type: String },
    created_at: Date,
    updated_at: Date
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

const BankModel = mongoose.model('banks', bankSchema);

module.exports = BankModel;
