// require to read .env file
const mongoose = require('../utils/configs')

const todoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  completed: { type: Boolean, required: true },
  created_at: Date,
  updated_at: Date,
})

module.exports = todoSchema
