import { LedgerOptions, WalletModule, CommonWalletOptions } from '../../../interfaces';
declare function ledger(options: LedgerOptions & CommonWalletOptions): WalletModule;
export default ledger;
