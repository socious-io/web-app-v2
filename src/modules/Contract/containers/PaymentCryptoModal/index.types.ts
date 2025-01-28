import { Contract } from 'src/core/adaptors';

export interface PaymentCryptoModalProps {
  open: boolean;
  handleClose: () => void;
  contract: Contract;
  onSucceedPayment?: (contract: Contract) => void;
}
