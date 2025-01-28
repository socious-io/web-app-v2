import { StripeAccount } from 'src/core/api';

export interface SelectBankAccountUserProps {
  open: boolean;
  handleClose: () => void;
  accounts: StripeAccount[];
  handleAccept: () => void;
}
