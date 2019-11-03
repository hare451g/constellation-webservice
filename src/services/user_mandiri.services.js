const userMandiriModel = require('../model/user_mandiri.model');
const status = require('../utils/constants');
const moment = require('moment');

const createNewUser = (req, res) => {
    try {
        const newUser = {
            username: req.body.username,
            pin: req.body.pin,
            account_number: req.body.account_number,
            created_at: moment(),
            updated_at: moment(),
        }
    
        const query = new userMandiriModel(newUser);
    
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

const fetchAllUser = (req, res) => {
    userMandiriModel.find((err, result) => {
        if (err) {
            res.status(status.HTTP_STATUS.ERROR).json(err);
        }
        if (result === null) {
            res.status(status.HTTP_STATUS.SUCCESS).json();
        }
        res.status(status.HTTP_STATUS.SUCCESS).json(result);
    });
};

const fetchOneUser = (req, res) => {
    const id = req.params.id;
    userMandiriModel.findById(id, (err, result) => {
        if (err) {
            res.status(status.HTTP_STATUS.ERROR).json(err);
        }
        if (result === null) {
            res.status(status.HTTP_STATUS.NOT_FOUND).json({ message: 'not found', id});
        }
        res.status(status.HTTP_STATUS.SUCCESS).json(result);
    });
};

const updateUser = (req, res) => {
    try {
        const id = req.params.id;
        userMandiriModel.findById(id, (err, result) => {
            if (err) {
                res.status(status.HTTP_STATUS.NOT_FOUND).json({ message: 'Not found !'});
            }
            if (req.body.username != null)  {
                result.username = req.body.username || result.name
            }
            if (req.body.pin != null)  {
                result.name = req.body.username || result.name
            }
            if (req.body.account_number != null)  {
                result.account_number = req.body.account_number || result.account_number
            }
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

const deleteUser = (req, res) => {
    const id = req.params.id;
    userMandiriModel.findByIdAndDelete(id, (err, result) => {
        if (err) {
            res.status(status.HTTP_STATUS.ERROR).json(err);
        }
        res.status(status.HTTP_STATUS.SUCCESS).json(result);
    });
};

module.exports = {
    createNewUser,
    fetchAllUser,
    fetchOneUser,
    updateUser,
    deleteUser,
};