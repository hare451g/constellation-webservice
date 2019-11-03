const moment = require('moment');

const UserBCAModel = require('./model');
const status = require('../../utils/constants');

async function createNewUser(req, res) {
  try {
    const newUser = {
      username: req.body.username,
      pin: req.body.pin,
      account_number: req.body.account_number,
      created_at: moment(),
      updated_at: moment()
    };

    const query = new UserBCAModel(newUser);

    query.save((err, query) => {
      if (err) {
        res.status(status.HTTP_STATUS.ERROR).json(err);
      }
      res.status(status.HTTP_STATUS.SUCCESS).json(query);
    });
  } catch (error) {
    res
      .status(status.HTTP_STATUS.ERROR)
      .json({ messsage: 'malformed request', error: `${error}` });
  }
}

async function fetchAllUser(req, res) {
  try {
    const users = await UserBCAModel.find();
    if (users === null) {
      res.status(status.HTTP_STATUS.SUCCESS).json();
    }
    res.status(status.HTTP_STATUS.SUCCESS).json(users);
  } catch (error) {
    res.status(status.HTTP_STATUS.ERROR).json(error);
  }
}

async function fetchOneUser(req, res) {
  const id = req.params.id;
  UserBCAModel.findById(id, (err, result) => {
    if (err) {
      res.status(status.HTTP_STATUS.ERROR).json(err);
    }
    if (result === null) {
      res
        .status(status.HTTP_STATUS.NOT_FOUND)
        .json({ message: 'not found', id });
    }
    res.status(status.HTTP_STATUS.SUCCESS).json(result);
  });
}

async function updateUser(req, res) {
  try {
    const id = req.params.id;
    UserBCAModel.findById(id, (err, result) => {
      if (err) {
        res
          .status(status.HTTP_STATUS.NOT_FOUND)
          .json({ message: 'Not found !' });
      }
      if (req.body.username != null) {
        result.username = req.body.username || result.name;
      }
      if (req.body.pin != null) {
        result.name = req.body.username || result.name;
      }
      if (req.body.account_number != null) {
        result.account_number =
          req.body.account_number || result.account_number;
      }
      (result.updated_at = moment()),
        result.save((err, updated) => {
          if (err) {
            res.status(status.HTTP_STATUS.ERROR).json(err);
          }
          res.status(status.HTTP_STATUS.SUCCESS).json(updated);
        });
    });
  } catch (error) {
    res
      .status(status.HTTP_STATUS.ERROR)
      .json({ messsage: 'malformed request', error: `${error}` });
  }
}

async function deleteUser(req, res) {
  const id = req.params.id;
  UserBCAModel.findByIdAndDelete(id, (err, result) => {
    if (err) {
      res.status(status.HTTP_STATUS.ERROR).json(err);
    }
    res.status(status.HTTP_STATUS.SUCCESS).json(result);
  });
}

module.exports = {
  createNewUser,
  fetchAllUser,
  fetchOneUser,
  updateUser,
  deleteUser
};
