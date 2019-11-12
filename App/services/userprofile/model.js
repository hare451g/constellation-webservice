const mongoose = require('../../utils/mongoose');

const userProfileSchema = new mongoose.Schema(
  {
    account_number: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    address: {
      type: String,
      unique: true
    },
    bank: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'bank'
    },
    is_activated: {
      type: Boolean,
      required: true,
      default: false
    },
    active_at: {
      type: Date
    },
    pin: {
      type: String,
      required: true
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
