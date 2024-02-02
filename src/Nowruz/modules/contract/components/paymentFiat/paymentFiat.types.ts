export interface PaymentFiatProps {
  offerId: string;
  open: boolean;
  handleClose: (paymentSuccess: boolean) => void;
  amount: number;
  currency: string;
}
