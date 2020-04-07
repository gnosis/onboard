import { TrezorOptions, WalletModule, CommonWalletOptions } from '../../../interfaces';
declare function trezor(options: TrezorOptions & CommonWalletOptions): WalletModule;
export default trezor;
