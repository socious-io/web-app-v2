import { Offer, Pagination } from '../../../../../core/types';

export type OfferedProps = {
  sent: Pagination<Offer[]>;
  approved: Pagination<Offer[]>;
  hired: Pagination<Offer[]>;
  closed: Pagination<Offer[]>;
};
