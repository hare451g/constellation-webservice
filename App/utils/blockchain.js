const wallet = require('generated-wallet');
const axios = require('axios').default;

const ABIs = require('../constants/abi');
const Address = require('../constants/addresses');
const web3 = require('../constants/web3');

function getContractInstance(contractName, address) {
  const abi = ABIs[contractName];
  return new web3.eth.Contract(abi, address);
}

async function createSeed(bankCode, accountNumber, hashedPin) {
  return web3.utils.keccak256(
    web3.utils.keccak256(bankCode) +
      web3.utils.keccak256(accountNumber) +
      web3.utils.keccak256(hashedPin)
  );
}

async function getAddress(seed) {
  return await wallet(seed).getAddress();
}

async function transact(contractName, fn, params, seed) {
  const walletContract = getContractInstance(
    contractName,
    Address[contractName]
  );

  const address = await getAddress(seed);

  const fromAddress = web3.utils.toChecksumAddress(address);
  const addrWallet = wallet(seed);

  const count = await web3.eth.getTransactionCount(fromAddress, 'pending');
  let data = await walletContract.methods[fn](...params).encodeABI();

  let signedTx;
  let result;
  let tempTx;

  try {
    tempTx = {
      from: fromAddress,
      to: web3.utils.toChecksumAddress(Address[contractName]),
      gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
      data: data,
      nonce: count,
      chainId: 4
    };

    tempTx.gasLimit = await web3.eth.estimateGas(tempTx);
  } catch (error) {
    console.log('when assigning gas limit', error);
    return error;
  }

  try {
    signedTx = await addrWallet.sign(tempTx);
    txHash = web3.utils.sha3(signedTx);
    result = await web3.eth.sendSignedTransaction(signedTx);
  } catch (err) {
    console.log('when signing', err);
    result = err;
  }

  return result;
}

async function activation(bankCode, bankAccount, hashedPIN) {
  const seed = await createSeed(bankCode, bankAccount, hashedPIN);

  const hashedAccount = web3.utils.keccak256(bankCode + bankAccount);

  const result = await transact(
    'CentralWallet',
    'newAccount',
    [hashedAccount],
    seed
  );

  return result;
}

// bank code = combination "{bankcode}-{currency}"
async function transferSameCurrency(
  bankCodeFrom,
  bankAccountFrom,
  hashedPIN,
  amount,
  bankCodeTo,
  bankAccountTo
) {
  // check if account have desired balance, based on bank SOP

  // sub account balance, based on bank SOP
  const hashedBankCodeFrom = web3.utils.keccak256(bankCodeFrom);
  const hashedBankCodeTo = web3.utils.keccak256(bankCodeTo);
  const hashedBankAccountFrom = web3.utils.keccak256(
    bankCodeFrom + bankAccountFrom
  );

  const seed = await createSeed(bankCodeFrom, bankAccountFrom, hashedPIN);

  const result = await transact(
    'Interbank',
    'transfer',
    [hashedBankCodeFrom, hashedBankAccountFrom, hashedBankCodeTo, amount],
    seed
  );

  return result;
}

async function transferDiffCurrency(
  currencyFrom,
  bankCodeFrom,
  bankAccountFrom,
  hashedPIN,
  amount,
  bankCodeTo,
  bankAccountTo
) {
  // check if account have desired balance, based on bank SOP
  // sub account balance, based on bank SOP
  // convert from currency from to currenncy to
  const curTo = bankCodeTo.split('-')[1];
  // call converter api
  const url = 'https://api.exchangeratesapi.io/latest?symbols='.concat(
    currencyFrom.toUpperCase(),
    ',',
    curTo.toUpperCase(),
    '&&base=',
    currencyFrom.toUpperCase()
  );
  const getRates = await axios.get(url);
  const rate = getRates.data.rates;
  const newAmount = Math.floor(amount * rate[curTo.toUpperCase()]);

  const hashedBankCodeFrom = web3.utils.keccak256(bankCodeFrom);
  const hashedBankCodeTo = web3.utils.keccak256(bankCodeTo);
  const hashedBankAccountFrom = web3.utils.keccak256(
    bankCodeFrom + bankAccountFrom
  );

  const seed = await createSeed(bankCodeFrom, bankAccountFrom, hashedPIN);

  const result = await transact(
    'Interbank',
    'transfer',
    [hashedBankCodeFrom, hashedBankAccountFrom, hashedBankCodeTo, newAmount],
    seed
  );

  return result;
}

async function addAsset(bankCode, amount, seed) {
  const hashedBankCode = web3.utils.keccak256(bankCode);

  const result = await transact(
    'Organization',
    'addAsset',
    [hashedBankCode, amount],
    seed
  );

  return result;
}

module.exports = {
  createSeed,
  getContractInstance,
  getAddress,
  transact,
  activation,
  transferSameCurrency,
  transferDiffCurrency,
  addAsset
};
