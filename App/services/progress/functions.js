const moment = require('moment');

const Progress = require('./model');
const status = require('../../utils/constants');
const createResponse = require('../../utils/createResponse');

async function createNewProgress(req, res) {
  try {
    const query = new Progress({
      status: req.body.name,
      created_at: moment()
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

async function fetchAllProgresses(req, res) {
  try {
    const progress = await Progress.find();
    res
      .status(status.HTTP_STATUS.SUCCESS)
      .json(createResponse('list', progress, null));
  } catch (error) {
    res.status(status.HTTP_STATUS.ERROR).json(error);
  }
}

async function fetchOneProgress(req, res) {
  try {
    const id = req.params.id;
    const progress = await Progress.findById(id);
    if (progress) {
      res
        .status(status.HTTP_STATUS.SUCCESS)
        .json(createResponse('object', progress, null));
    } else {
      res
        .status(status.HTTP_STATUS.NOT_FOUND)
        .json(createResponse('object', progress, null));
    }
  } catch (err) {
    res.status(status.HTTP_STATUS.ERROR).json(err);
  }
}

async function updateProgress(req, res) {
  try {
    const id = req.params.id;

    const progress = await Progress.findByIdAndUpdate(id, {
      ...req.body,
      updated_at: moment()
    });

    if (!progress) {
      throw 'id is not found!';
    }

    res
      .status(status.HTTP_STATUS.SUCCESS)
      .json(createResponse('object', progress, null));
  } catch (error) {
    res
      .status(status.HTTP_STATUS.ERROR)
      .json({ messsage: 'malformed request', error: `${error}` });
  }
}

async function deleteProgress(req, res) {
  try {
    const id = req.params.id;

    const deleted = await Progress.findByIdAndDelete(id);
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
  createNewProgress,
  fetchAllProgresses,
  fetchOneProgress,
  updateProgress,
  deleteProgress
};
