import { Offer } from 'src/core/api';

export interface ContractCardProps {
  offer: Offer;
  type: 'users' | 'organizations';
}
