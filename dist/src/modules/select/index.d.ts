import { WalletModule, WalletInitOptions } from '../../interfaces';
declare function select(wallets: Array<WalletInitOptions | WalletModule> | undefined, networkId: number): Promise<any[]>;
export default select;
