require('dotenv').config();

const { BLOCKCHAIN_NET } = process.env;

const web3 = new Web3(BLOCKCHAIN_NET);

module.exports = web3;
