const moment = require("moment");
const bcrypt = require("bcrypt");
const Web3 = require("web3");
const web3 = new Web3(
  "https://rinkeby.infura.io/v3/a32a968e178041e3ad9c70f54be32557"
);
// models
const BankModels = require("../bank/model");
const UserProfileModel = require("../userprofile/model");
const TxModel = require("./model");

// utils
const crud = require("../../utils/crud");
const blockchain = require("../../utils/contracts");

async function getAll(req, res) {
  try {
    const { _id: userId } = req.user;

    const selectedUser = await UserProfileModel.findById(userId).populate(
      "bank"
    );

    if (!selectedUser) {
      throw { message: "Could not find from User!" };
    }

    const txList = await TxModel.find({ from: userId }).populate([
      { path: "from", populate: { path: "bank" } },
      { path: "to", populate: { path: "bank" } }
    ]);

    res.status(200).json({ list: txList });
  } catch (error) {
    res.status(400).json(error);
  }
}

async function createNewTransaction(req, res) {
  try {
    const { amount, to } = req.body;
    const { _id: from } = req.user;

    const targetUser = await UserProfileModel.findById(to);
    if (!targetUser) {
      throw { message: "Could not find target User!" };
    }

    const fromUser = await UserProfileModel.findById(from).populate("bank");
    if (!fromUser) {
      throw { message: "Could not find from User!" };
    }

    const tx = new TxModel({ amount, from, to });
    const savedTx = await tx.save();

    if (!savedTx) {
      throw { message: "Could not save tx! " };
    }

    const selectedTx = await TxModel.findById(savedTx.id).populate([
      { path: "from", populate: { path: "bank" } },
      { path: "to", populate: { path: "bank" } }
    ]);

    if (!selectedTx) {
      throw { message: "Could not select Tx! " };
    }

    blockchain
      .transferSameCurrency(
        "testBank-idr",
        "124987382999",
        web3.utils.keccak256("iniPIN"),
        1,
        "testBankA-idr",
        "124987382999"
      )
      .then(response => {
        res.status(201).json(response);
      })
      .catch(error => {
        console.log(error);
        res.status(400).json(error);
      });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

module.exports = { getAll, createNewTransaction };
