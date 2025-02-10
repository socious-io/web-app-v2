import { Contract } from 'src/core/adaptors';

export interface PaymentFiatModalProps {
  open: boolean;
  handleClose: () => void;
  contract: Contract;
  onSucceedPayment?: (contract: Contract) => void;
}
