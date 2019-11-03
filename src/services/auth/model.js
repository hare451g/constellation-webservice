const mongoose = require('../../utils/mongoose');

const authSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: true,
      unique: true
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

const AuthModel = mongoose.model('users', authSchema);

module.exports = AuthModel;
