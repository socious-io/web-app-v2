import { FollowingsReq, Pagination, SummaryReq } from 'src/core/types';

export type Resolver = {
  summery: Pagination<SummaryReq[]>;
  followings: Pagination<FollowingsReq[]>;
};
