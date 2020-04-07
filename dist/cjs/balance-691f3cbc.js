'use strict';

require('regenerator-runtime/runtime');

var onboard = require('./onboard-5f6dc8e8.js');

require('bignumber.js');

require('bnc-sdk');

require('bowser');

function balance() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    minimumBalance: '0'
  };
  onboard.validateType({
    name: 'balance options',
    value: options,
    type: 'object'
  });
  var minimumBalance = options.minimumBalance,
      heading = options.heading,
      description = options.description,
      icon = options.icon;
  onboard.validateType({
    name: 'minimumBalance',
    value: minimumBalance,
    type: 'string'
  });
  return function (StateAndHelpers) {
    var balance = StateAndHelpers.balance,
        BigNumber = StateAndHelpers.BigNumber; // if balance is less than minimum

    if (BigNumber(balance).lt(BigNumber(minimumBalance))) {
      return {
        heading: heading || 'Get Some ETH',
        description: description || "Your current account has less than the necessary minimum balance of ".concat(BigNumber(minimumBalance).div(BigNumber('1000000000000000000')).toString(10), " ETH."),
        eventCode: 'nsfFail',
        icon: icon || onboard.balanceIcon
      };
    }
  };
}

exports["default"] = balance;