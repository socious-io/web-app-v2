import { PaginateRes } from '../types';

export interface Dispute {
  id: string;
}
export interface DisputesRes extends PaginateRes {
  items: Dispute[];
}
