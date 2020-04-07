'use strict';

require('regenerator-runtime/runtime');

var onboard = require('./onboard-5f6dc8e8.js');

require('bignumber.js');

require('bnc-sdk');

require('bowser');

function connect() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var heading = options.heading,
      description = options.description,
      icon = options.icon;
  return function (stateAndHelpers) {
    var wallet = stateAndHelpers.wallet,
        address = stateAndHelpers.address;

    if (!address && wallet && wallet.name) {
      return {
        heading: heading || 'Login and Authorize Your Wallet',
        description: description || "This dapp requires access to your wallet, please login and authorize access to your ".concat(wallet.name, " accounts to continue."),
        eventCode: 'loginFail',
        action: wallet.connect,
        icon: icon || onboard.connectIcon
      };
    }
  };
}

exports["default"] = connect;