const wallet = require('generated-wallet');
const Web3 = require('web3');
const ABIs = require('../constants/abi');
const Address = require('../constants/addresses');
const axios = require('axios').default;

const web3 = new Web3(
  'https://rinkeby.infura.io/v3/a32a968e178041e3ad9c70f54be32557'
);

async function getContractInstance(contractName, address) {
  const abi = ABIs[contractName];
  return new web3.eth.Contract(abi, address);
}

async function getAddress(seed) {
  const callback = await wallet(seed);
  return await callback.getAddress();
}

async function transact(contractName, fn, params, seed) {
  const walletContract = await getContractInstance(
    contractName,
    Address[contractName]
  );

  const fromAddress = web3.utils.toChecksumAddress(await getAddress(seed));
  const addrWallet = await wallet(seed);

  const count = await web3.eth.getTransactionCount(fromAddress, 'pending');

  let data = await walletContract.methods[fn](...params).encodeABI();

  let tempTx = {
    from: fromAddress,
    to: web3.utils.toChecksumAddress(Address[contractName]),
    gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
    data: data,
    nonce: count,
    chainId: 4
  };
  tempTx.gasLimit = await web3.eth.estimateGas(tempTx);
  let signedTx;
  let result;
  try {
    signedTx = await addrWallet.sign(tempTx);
    txHash = web3.utils.sha3(signedTx);
    result = await web3.eth.sendSignedTransaction(signedTx);
  } catch (err) {
    result = err;
  }

  return result;
}

async function activation(bankCode, bankAccount, hashedPIN) {
  const seed = web3.utils.keccak256(
    web3.utils.keccak256(bankCode) +
      web3.utils.keccak256(bankAccount) +
      web3.utils.keccak256(hashedPIN)
  );

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

  const seed = web3.utils.keccak256(
    web3.utils.keccak256(bankCodeFrom) +
      web3.utils.keccak256(bankAccountFrom) +
      hashedPIN
  );

  const result = await transact(
    'Interbank',
    'transfer',
    [hashedBankCodeFrom, hashedBankAccountFrom, hashedBankCodeTo, amount],
    seed
  );

  return result;
}

// bank code = combination "{bankcode}-{currency}"
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
  console.log(getRates.data.rates);
  const rate = getRates.data.rates;
  const newAmount = Math.floor(amount * rate[curTo.toUpperCase()]);

  const hashedBankCodeFrom = web3.utils.keccak256(bankCodeFrom);
  const hashedBankCodeTo = web3.utils.keccak256(bankCodeTo);
  const hashedBankAccountFrom = web3.utils.keccak256(
    bankCodeFrom + bankAccountFrom
  );

  const seed = web3.utils.keccak256(
    web3.utils.keccak256(bankCodeFrom) +
      web3.utils.keccak256(bankAccountFrom) +
      hashedPIN
  );

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
  console.log(hashedBankCode);
  const result = await transact(
    'Organization',
    'addAsset',
    [hashedBankCode, amount],
    seed
  );

  return result;
}

module.exports = {
  getContractInstance,
  getAddress,
  transact,
  activation,
  transferSameCurrency,
  transferDiffCurrency,
  addAsset
};

// getAddress('999', '124987382999', web3.utils.keccak256('iniPIN')).then(
//   console.log
// );

// activation('999', '124987382999', web3.utils.keccak256('iniPIN')).then(
//   console.log
// );

// getAddress(web3.utils.keccak256('testAddr')).then(console.log);

// addAsset('testBank-idr', 90, web3.utils.keccak256('testAddr')).then(
//   console.log
// );

// getAddress(
//   web3.utils.keccak256(
//     web3.utils.keccak256('testBank-idr') +
//       web3.utils.keccak256('124987382999') +
//       web3.utils.keccak256('iniPIN')
//   )
// ).then(console.log);

// activation('testBank-idr', '124987382999', 'iniPIN')

// transferSameCurrency(
//   'testBank-idr',
//   '124987382999',
//   web3.utils.keccak256('iniPIN'),
//   1,
//   'testBankA-idr',
//   '124987382999'
// ).then(console.log);

// transferDiffCurrency(
//   'usd',
//   'testBank-idr',
//   '124987382999',
//   web3.utils.keccak256('iniPIN'),
//   2,
//   'testBankA-idr',
//   '124987382999'
// ).then(console.log);
