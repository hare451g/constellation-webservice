const mongoose = require('../../utils/mongoose');

const userProfileSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true
    },
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'userprofile'
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'userprofile'
    },
    transaction_hash: {
      type: String
    },
    status: {
      type: String,
      enum: ['INITIAL', 'SENDING', 'SENT', 'FAILED'],
      default: 'INITIAL'
    }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

const UserProfileModel = mongoose.model('transactions', userProfileSchema);

module.exports = UserProfileModel;
