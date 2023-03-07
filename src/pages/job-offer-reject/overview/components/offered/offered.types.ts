import { Pagination } from '../../../../../core/types';

export type OfferedProps = {
  sent: Pagination<unknown[]>;
  approved: Pagination<unknown[]>;
  hired: Pagination<unknown[]>;
  closed: Pagination<unknown[]>;
};
