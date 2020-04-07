import { WalletCheckModule } from '../../interfaces';
declare function network(options?: {
    heading?: string;
    description?: string;
    icon?: string;
}): WalletCheckModule | never;
export default network;
