import { Offer } from 'src/core/api';

export interface AddCardModalUserProps {
  open: boolean;
  handleClose: () => void;
  offer: Offer;
}
