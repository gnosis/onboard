import 'regenerator-runtime/runtime';
import { c as connectIcon } from './onboard-5beb3c40.js';
import 'bignumber.js';
import 'bnc-sdk';
import 'bowser';

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
        icon: icon || connectIcon
      };
    }
  };
}

export default connect;