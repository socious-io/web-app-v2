import { BadgesResp, Pagination } from '../../core/types';

export type Loader = {
  badges: { badges: BadgesResp };
  impactPoints: Pagination<unknown[]>;
};
