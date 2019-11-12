require('dotenv').config();
const Web3 = require('web3');

const { BLOCKCHAIN_NET } = process.env;

const web3 = new Web3(BLOCKCHAIN_NET);

module.exports = web3;
