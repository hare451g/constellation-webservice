const mongoose = require('../../utils/mongoose');

const transactionSchema = new mongoose.Schema(
  {
    amount: {
      type: Number, 
      required: true
    },
    currency: {
      type: String,
      required: true
    },
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'userprofile',
      required: true
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'userprofile',
      required: true
    },
    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BankAccountModel',
      required: true
    },
    progresses: [{
        progress: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'progress',
          required: true
        }
    }]  
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

const TransactionModel = mongoose.model('TransactionModel', transactionSchema);

module.exports = TransactionModel;
