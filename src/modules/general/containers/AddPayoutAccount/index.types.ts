import { Offer } from 'src/core/api';

export interface AddPayoutAccountProps {
  open: boolean;
  handleClose: () => void;
  offer?: Offer;
}
