const mongoose = require('../../utils/mongoose');

const progressSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true }
  },
  {
    timestamps: {
      createdAt: 'created_at'
    }
  }
);

const Progress = mongoose.model('progress', progressSchema);

module.exports = Progress;