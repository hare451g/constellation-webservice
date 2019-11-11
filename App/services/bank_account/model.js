const mongoose = require('../../utils/mongoose');

const bankAccountSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true
    },
    pin: {
      type: String,
      required: true
    },
    account_number: {
      type: Number,
      required: true,
      unique: true
    },
    balance: {
      type: Number,
      required: true,
      default: 100000.0
    },
    currency: {
      type: String,
      required: true,
      trim: true
    },
    bank: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'bank'
    }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

const BankAccountModel = mongoose.model('account', bankAccountSchema);

module.exports = BankAccountModel
