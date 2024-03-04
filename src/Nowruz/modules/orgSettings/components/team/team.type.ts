import { FollowingRes, MembersRes } from 'src/core/api';

export type Resolver = {
  members: MembersRes;
  followings: FollowingRes;
};
