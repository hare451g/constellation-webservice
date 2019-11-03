const todoModel = require('../model/todo.model');
const status = require('../utils/constants');
const moment = require('moment');

const createNewTodo = (req, res) => {
    try {
        const newTodo = {
            name: req.body.todo.name,
            completed: false,
            created_at: moment(),
            updated_at: moment(),
        }
    
        const query = new todoModel(newTodo);
    
        query.save((err, query) => {
            if (err) {
                res.status(status.HTTP_STATUS.ERROR).json(err);
            }
            res.status(status.HTTP_STATUS.SUCCESS).json(query);
        });
    } catch (error) {
        res.status(status.HTTP_STATUS.ERROR).json({messsage: 'malformed request', error: `${error}`});
    }
};

const fetchAllTodo = (req, res) => {
    todoModel.find((err, result) => {
        if (err) {
            res.status(status.HTTP_STATUS.ERROR).json(err);
        }
        if (result === null) {
            res.status(status.HTTP_STATUS.SUCCESS).json();
        }
        res.status(status.HTTP_STATUS.SUCCESS).json(result);
    });
};

const fetchOneTodo = (req, res) => {
    const id = req.params.id;
    todoModel.findById(id, (err, result) => {
        if (err) {
            res.status(status.HTTP_STATUS.ERROR).json(err);
        }
        if (result === null) {
            res.status(status.HTTP_STATUS.NOT_FOUND).json({ message: 'not found', id});
        }
        res.status(status.HTTP_STATUS.SUCCESS).json(result);
    });
};

const updateTodo = (req, res) => {
    try {
        const id = req.params.id;
        todoModel.findById(id, (err, result) => {
            if (err) {
                res.status(status.HTTP_STATUS.NOT_FOUND).json({ message: 'Not found !'});
            }
            result.name = req.body.todo.name || result.name,
            result.completed = req.body.todo.completed || !result.completed,
            result.updated_at = moment(),
            
            result.save((err, updated) => {
                if (err) {
                    res.status(status.HTTP_STATUS.ERROR).json(err);
                }
                res.status(status.HTTP_STATUS.SUCCESS).json(updated);      
            })
        })
    } catch (error) {
        res.status(status.HTTP_STATUS.ERROR).json({messsage: 'malformed request', error: `${error}`});
    }
};

const deleteTodo = (req, res) => {
    const id = req.params.id;
    todoModel.findByIdAndDelete(id, (err, result) => {
        if (err) {
            res.status(status.HTTP_STATUS.ERROR).json(err);
        }
        res.status(status.HTTP_STATUS.SUCCESS).json(result);
    });
};

module.exports = {
    createNewTodo,
    fetchAllTodo,
    fetchOneTodo,
    updateTodo,
    deleteTodo,
};