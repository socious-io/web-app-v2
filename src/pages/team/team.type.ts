import { FollowingsReq, MemberIdentity, Pagination } from 'src/core/types';

export type Resolver = {
  members: Pagination<MemberIdentity[]>;
  followings: Pagination<FollowingsReq[]>;
};
