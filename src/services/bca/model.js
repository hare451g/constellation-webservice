const mongoose = require('../../utils/configs');

const userBcaSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true },
    pin: { type: String, required: true },
    account_number: { type: String, required: true, unique: true },
    balance: { type: Number, required: true, default: 100000.0 },
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

const UserBCAModel = mongoose.model('user_bca', userBcaSchema);

module.exports = UserBCAModel;
