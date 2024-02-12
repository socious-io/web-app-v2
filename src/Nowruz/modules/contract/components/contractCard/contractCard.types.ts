import { Offer } from 'src/core/api';

export interface ContractCardProps {
  offer: Offer;
  setOpenOverlay: (val: boolean) => void;
}
