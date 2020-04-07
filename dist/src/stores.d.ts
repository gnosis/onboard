import { WritableStore, WalletInterfaceStore, WalletStateSliceStore, BalanceStore, CancelablePromise } from './interfaces';
export declare const app: WritableStore;
export declare const balanceSyncStatus: {
    syncing: null | CancelablePromise;
    error: string;
};
export declare const address: WalletStateSliceStore;
export declare const network: WalletStateSliceStore;
export declare const balance: BalanceStore;
export declare const wallet: WritableStore;
export declare const state: import("svelte/store").Readable<{
    address: any;
    network: any;
    balance: any;
    wallet: any;
    mobileDevice: any;
    appNetworkId: any;
}>;
export declare const walletInterface: WalletInterfaceStore;
export declare function resetWalletState(options?: {
    disconnected: boolean;
    walletName: string;
}): void;
