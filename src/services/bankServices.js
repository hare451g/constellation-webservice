const bankModel = require('../model/bankModel');
const status = require('../utils/constants');
const moment = require('moment');

const createNewBank = (req, res) => {
  try {
    const newBank = {
      name: req.body.name,
      pin: req.body.pin,
      code: req.body.code,
      available_currency: [],
      created_at: moment(),
      updated_at: moment()
    };

    const query = new bankModel(newBank);

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
};

const fetchAllBanks = (req, res) => {
  bankModel.find((err, result) => {
    if (err) {
      res.status(status.HTTP_STATUS.ERROR).json(err);
    }
    if (result === null) {
      res.status(status.HTTP_STATUS.SUCCESS).json();
    }
    res.status(status.HTTP_STATUS.SUCCESS).json(result);
  });
};

const fetchOneBank = (req, res) => {
  const id = req.params.id;
  bankModel.findById(id, (err, result) => {
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
};

const updateBank = (req, res) => {
  try {
    const id = req.params.id;
    bankModel.findById(id, (err, result) => {
      if (err) {
        res
          .status(status.HTTP_STATUS.NOT_FOUND)
          .json({ message: 'Not found !' });
      }
      if (req.body.username != null) {
        result.name = req.body.name || result.name;
      }
      if (req.body.code != null) {
        result.code = req.body.code || result.code;
      }
      if (req.body.available_currency != null) {
        result.available_currency =
          req.body.available_currency || result.available_currency;
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
};

const deleteBank = (req, res) => {
  const id = req.params.id;
  bankModel.findByIdAndDelete(id, (err, result) => {
    if (err) {
      res.status(status.HTTP_STATUS.ERROR).json(err);
    }
    res.status(status.HTTP_STATUS.SUCCESS).json(result);
  });
};

module.exports = {
  createNewBank,
  fetchAllBanks,
  fetchOneBank,
  updateBank,
  deleteBank
};
