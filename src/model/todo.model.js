const mongoose = require('../utils/configs')

const todoSchemas = require('../schemas/todo.schemas')

const todoModel = mongoose.model('todo', todoSchemas)

module.exports = todoModel
