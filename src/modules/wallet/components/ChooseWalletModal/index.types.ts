import { ModalProps } from 'src/modules/general/components/modal/modal.types';

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
