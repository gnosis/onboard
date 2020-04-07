import { WalletSelectModule, WalletCheckModule, WalletCheckInit } from '../interfaces';
export default function initializeModules(networkId: number, walletSelect: WalletSelectModule | undefined, walletCheck: Array<WalletCheckModule | WalletCheckInit> | undefined): {
    walletSelect: {
        heading: string;
        description: string;
        wallets: Promise<any[]>;
        explanation: string;
    };
    walletCheck: Promise<WalletCheckModule[]>;
};
