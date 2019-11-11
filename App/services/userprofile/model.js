const mongoose = require('../../utils/mongoose');

const userProfileSchema = new mongoose.Schema(
  {
    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'account'
    },
    address: { type: String },
    bank: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'bank'
    },
    transactions: [{
      transaction: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'transaction'
      }
    }],
    is_activated: {
      type: Boolean,
      required: true,
      default: false
    },
    active_at: {
      type: Date
    }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

const UserProfileModel = mongoose.model('userprofile', userProfileSchema);

module.exports = UserProfileModel;
