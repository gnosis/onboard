import { WalletCheckModal, StateAndHelpers } from '../../interfaces';
declare function balance(options?: {
    minimumBalance: string;
    heading?: string;
    description?: string;
    icon?: string;
}): (currentState: StateAndHelpers) => WalletCheckModal | undefined;
export default balance;
