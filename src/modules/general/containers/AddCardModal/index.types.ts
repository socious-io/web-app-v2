import { Card } from 'src/core/api';

export interface AddCardModalProps {
  open: boolean;
  handleClose: () => void;
  setCardsList: (list: Card[]) => void;
  currency?: string;
}
