import { Offer } from 'src/core/api';

export interface PaymentFiatProps {
  open: boolean;
  handleClose: (paymentSuccess: boolean) => void;
  offer?: Offer;
}
