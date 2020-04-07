import 'regenerator-runtime/runtime';
import { n as networkName, b as networkIcon } from './onboard-5beb3c40.js';
import 'bignumber.js';
import 'bnc-sdk';
import 'bowser';

function network() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var heading = options.heading,
      description = options.description,
      icon = options.icon;
  return function (stateAndHelpers) {
    var network = stateAndHelpers.network,
        appNetworkId = stateAndHelpers.appNetworkId,
        walletSelect = stateAndHelpers.walletSelect,
        exit = stateAndHelpers.exit;

    if (network != appNetworkId) {
      return {
        heading: heading || 'You Must Change Networks',
        description: description || "We've detected that you need to switch your wallet's network from <b>".concat(networkName(network), "</b> to <b>").concat(networkName(appNetworkId), " network</b> for this Dapp. <br><br> <i style=\"font-size: inherit; font-family: inherit;\">*Some wallets may not support changing networks. If you can not change networks in your wallet you may consider switching to a different wallet.</i>"),
        eventCode: 'networkFail',
        button: {
          onclick: function onclick() {
            exit();
            walletSelect();
          },
          text: 'Switch Wallet'
        },
        icon: icon || networkIcon
      };
    }
  };
}

export default network;