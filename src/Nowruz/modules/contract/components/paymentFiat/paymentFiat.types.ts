// import { CardsRes } from 'src/core/api';

export interface PaymentFiatProps {
  open: boolean;
  handleClose: () => void;
  amount: number;
  currency: string;
  // setCardsList: (list: CardsRes) => void;

  //  currency?: string;
}
