const mongoose = require('../../utils/mongoose');

const authSchema = new mongoose.Schema(
  {
    account_number: {
      type: String,
      required: true,
      unique: true
    },

    pin: {
      type: String,
      required: true
    },

    userprofile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'userprofile',
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

const AuthModel = mongoose.model('auth', authSchema);

module.exports = AuthModel;
