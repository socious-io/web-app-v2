import { Offer } from 'src/core/api';

export interface PaymentCryptoProps {
  open: boolean;
  handleClose: (paymentSuccess: boolean) => void;
  offer?: Offer;
}
