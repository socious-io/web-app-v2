import { ChatsRes, FollowingRes } from 'src/core/api';

export type Resolver = {
  summery: ChatsRes;
  followings: FollowingRes;
};
