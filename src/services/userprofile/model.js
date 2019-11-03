const mongoose = require('../../utils/mongoose');

const userProfileSchema = new mongoose.Schema(
  {
    account_number: { type: String, required: true, trim: true, unique: true },
    address: { type: String, unique: true },
    bank: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'banks'
    }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

const UserProfileModel = mongoose.model('user_profiles', userProfileSchema);

module.exports = UserProfileModel;
