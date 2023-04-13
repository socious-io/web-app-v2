import { MakeGenerics } from '@tanstack/react-location';
import { FollowingsReq, Pagination } from '../../../core/types';

export type FollowingsLoader = MakeGenerics<{
  LoaderData: {
    followings: Pagination<FollowingsReq[]>;
  };
}>;
