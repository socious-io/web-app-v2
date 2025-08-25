import { ModalProps } from '../Modal/index.types';

export type Wallet = {
  name: string;
  icon: string;
  type: string;
  connector?: unknown;
};

export interface ChooseWalletModalProps extends ModalProps {
  wallets: Wallet[];
  onWalletSelect: (wallet: Wallet) => void;
}
