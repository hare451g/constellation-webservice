const express = require('express');
const router = express.Router();
// import todo services from services
const TodoServices = require('../services/todo.services');

// define the home page route
router.post('/', TodoServices.createNewTodo);
router.get('/', TodoServices.fetchAllTodo);
router.get('/:id', TodoServices.fetchOneTodo);
router.put('/:id', TodoServices.updateTodo);
router.delete('/:id', TodoServices.deleteTodo);

module.exports = router;