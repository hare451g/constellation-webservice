const moment = require('moment');
const axios = require('axios');

const { BASE_API_URL } = require('../../constants/api');

const status = require('../../utils/constants');

const UserProfileModel = require('./model');

async function createNewProfile(req, res) {
  try {
    const { account_number, bank_code, pin } = req.body;

    // get bank by bank code
    const response = await axios.get(`${BASE_API_URL}/banks/code/${bank_code}`);
    if (!response.data) {
      throw { messsage: 'invalid bank code' };
    }

    const query = new UserProfileModel({
      account_number,
      bank: response.data._id
    });

    const saved = await query.save();

    if (saved) {
      const authResponse = await axios.post(`${BASE_API_URL}/auth/initialize`, {
        account_number,
        user_id: saved._id,
        pin
      });

      if (authResponse.data) {
        res.status(status.HTTP_STATUS.SUCCESS).json(saved);
      } else {
        throw { messsage: 'error when initialize auth' };
      }
    } else {
      throw { messsage: 'error when creating userprofile' };
    }
  } catch (error) {
    console.log(error);
    res.status(status.HTTP_STATUS.ERROR).json(error);
  }
}

async function fetchAllProfiles(req, res) {
  try {
    const userprofile = await UserProfileModel.find().populate('bank');
    res.status(status.HTTP_STATUS.SUCCESS).json({
      list: userprofile
    });
  } catch (error) {
    res.status(status.HTTP_STATUS.ERROR).json(error);
  }
}

async function fetchOneProfile(req, res) {
  try {
    const id = req.params.id;
    const userprofile = await UserProfileModel.findById(id).populate('bank');
    res.status(status.HTTP_STATUS.SUCCESS).json(userprofile);
  } catch (err) {
    res.status(status.HTTP_STATUS.ERROR).json(err);
  }
}

async function updateProfile(req, res) {
  try {
    const id = req.params.id;

    const userprofile = await UserProfileModel.findByIdAndUpdate(id, {
      ...req.body,
      updated_at: moment()
    });

    if (!userprofile) {
      throw 'userprofile is not found!';
    }

    res.status(status.HTTP_STATUS.SUCCESS).json(userprofile);
  } catch (error) {
    res
      .status(status.HTTP_STATUS.ERROR)
      .json({ messsage: 'malformed request', error: `${error}` });
  }
}

async function deleteProfile(req, res) {
  try {
    const id = req.params.id;

    const deleted = await UserProfileModel.findByIdAndDelete(id);

    res.status(status.HTTP_STATUS.SUCCESS).json(deleted);
  } catch (error) {
    res
      .status(status.HTTP_STATUS.ERROR)
      .json({ messsage: 'malformed request', error });
  }
}

module.exports = {
  createNewProfile,
  fetchAllProfiles,
  fetchOneProfile,
  updateProfile,
  deleteProfile
};
