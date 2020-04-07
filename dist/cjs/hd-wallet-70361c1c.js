'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _interopDefault(ex) {
  return ex && _typeof(ex) === 'object' && 'default' in ex ? ex['default'] : ex;
}

var Web3ProviderEngine = _interopDefault(require('web3-provider-engine'));

var RpcSource = _interopDefault(require('web3-provider-engine/subproviders/rpc'));

var HookedWalletSubprovider = _interopDefault(require('web3-provider-engine/subproviders/hooked-wallet'));

var SubscriptionSubprovider = _interopDefault(require('web3-provider-engine/subproviders/subscriptions'));

var FilterSubprovider = _interopDefault(require('web3-provider-engine/subproviders/filters'));

var HDKey = _interopDefault(require('hdkey'));

var ethUtil = require('ethereumjs-util');

var buffer = _interopDefault(require('buffer'));

function createProvider(config) {
  var getAccounts = config.getAccounts,
      signTransaction = config.signTransaction,
      rpcUrl = config.rpcUrl,
      signMessage = config.signMessage,
      signPersonalMessage = config.signPersonalMessage;
  var idMgmt = new HookedWalletSubprovider({
    getAccounts: getAccounts,
    signTransaction: signTransaction,
    signMessage: signMessage,
    signPersonalMessage: signPersonalMessage
  });
  var rpcSubProvider = new RpcSource({
    rpcUrl: rpcUrl.includes('http') ? rpcUrl : "https://".concat(rpcUrl)
  });
  var provider = new Web3ProviderEngine();
  provider.addProvider(new SubscriptionSubprovider());
  provider.addProvider(new FilterSubprovider());
  provider.addProvider(idMgmt);
  provider.addProvider(rpcSubProvider);
  provider.start();
  return provider;
}

var numberToGet = 5;

function generateAddresses(account, offset) {
  var publicKey = account.publicKey,
      chainCode = account.chainCode,
      path = account.path;
  var hdk = new HDKey();
  hdk.publicKey = new buffer.Buffer(publicKey, 'hex');
  hdk.chainCode = new buffer.Buffer(chainCode, 'hex');
  var addresses = [];

  for (var i = offset; i < numberToGet + offset; i++) {
    var dkey = hdk.deriveChild(i);
    var address = ethUtil.publicToAddress(dkey.publicKey, true).toString('hex');
    addresses.push({
      dPath: "".concat(path, "/").concat(i),
      address: ethUtil.toChecksumAddress(address)
    });
  }

  return addresses;
}

function isValidPath(path) {
  var parts = path.split('/');

  if (parts[0] !== 'm') {
    return false;
  }

  if (parts[1] !== "44'") {
    return false;
  }

  if (parts[2] !== "60'" && parts[2] !== "1'") {
    return false;
  }

  if (parts[3] === undefined) {
    return true;
  }

  var accountFieldDigit = Number(parts[3][0]);

  if (isNaN(accountFieldDigit) || accountFieldDigit < 0 || parts[3][1] !== "'") {
    return false;
  }

  if (parts[4] === undefined) {
    return true;
  }

  var changeFieldDigit = Number(parts[4][0]);

  if (isNaN(changeFieldDigit) || changeFieldDigit < 0) {
    return false;
  }

  if (parts[5] === undefined) {
    return true;
  }

  var addressFieldDigit = Number(parts[5][0]);

  if (isNaN(addressFieldDigit) || addressFieldDigit < 0) {
    return false;
  }

  return true;
}

exports.createProvider = createProvider;
exports.generateAddresses = generateAddresses;
exports.isValidPath = isValidPath;