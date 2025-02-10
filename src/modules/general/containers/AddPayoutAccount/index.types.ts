import { PaymentCurrency } from 'src/core/api';

export interface AddPayoutAccountProps {
  open: boolean;
  handleClose: () => void;
  currency?: PaymentCurrency;
}
