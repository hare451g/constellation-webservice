const moment = require('moment');

const bankModel = require('./model');
const status = require('../../utils/constants');
const createResponse = require('../../utils/createResponse');

async function createNewBank(req, res) {
  try {
    const query = new bankModel({
      name: req.body.name,
      code: req.body.code,
      available_currency: [],
      created_at: moment(),
      updated_at: moment()
    });

    const saved = await query.save();

    if (saved) {
      res
        .status(status.HTTP_STATUS.SUCCESS)
        .json(createResponse('object', saved));
    }
  } catch (error) {
    res
      .status(status.HTTP_STATUS.ERROR)
      .json({ messsage: 'malformed request', error: `${error}` });
  }
}

async function fetchAllBanks(req, res) {
  try {
    const banks = await bankModel.find();
    res
      .status(status.HTTP_STATUS.SUCCESS)
      .json(createResponse('list', banks, null));
  } catch (error) {
    res.status(status.HTTP_STATUS.ERROR).json(error);
  }
}

async function fetchOneBank(req, res) {
  try {
    const id = req.params.id;
    const bank = await bankModel.findById(id);
    if (bank) {
      res
        .status(status.HTTP_STATUS.SUCCESS)
        .json(createResponse('object', bank, null));
    } else {
      res
        .status(status.HTTP_STATUS.NOT_FOUND)
        .json(createResponse('object', bank, null));
    }
  } catch (err) {
    res.status(status.HTTP_STATUS.ERROR).json(err);
  }
}

async function updateBank(req, res) {
  try {
    const id = req.params.id;

    const bank = await bankModel.findByIdAndUpdate(id, {
      ...req.body,
      updated_at: moment()
    });

    if (!bank) {
      throw 'id is not found!';
    }

    res
      .status(status.HTTP_STATUS.SUCCESS)
      .json(createResponse('object', bank, null));
  } catch (error) {
    res
      .status(status.HTTP_STATUS.ERROR)
      .json({ messsage: 'malformed request', error: `${error}` });
  }
}

async function deleteBank(req, res) {
  try {
    const id = req.params.id;

    const deleted = await bankModel.findByIdAndDelete(id);
    if (deleted) {
      res.status(status.HTTP_STATUS.ERROR).json(deleted);
    }
  } catch (error) {
    res
      .status(status.HTTP_STATUS.ERROR)
      .json({ messsage: 'malformed request', error });
  }
}

module.exports = {
  createNewBank,
  fetchAllBanks,
  fetchOneBank,
  updateBank,
  deleteBank
};
