import { get } from 'src/core/http';
import { FollowingsReq, Pagination } from 'src/core/types';

export async function getFollowings(payload: { page: number }): Promise<Pagination<FollowingsReq[]>> {
  return get(`follows/followings?page=${payload.page}`).then(({ data }) => {
    return data;
  });
}
