import { useState } from 'react';
import { useMatch } from '@tanstack/react-location';
import { endpoint } from 'src/core/endpoints';
import { FollowingsReq, Pagination } from 'src/core/types';
import { getFollowings } from './followings.service';

export const useFollowingsShared = () => {
  const resolver = (useMatch().ownData as Pagination<FollowingsReq[]>) || {};
  const [followings, setFollowings] = useState(resolver);
  const [followingStatus, setFollowingStatus] = useState<'FOLLOW' | 'UNFOLLOW'>('FOLLOW');
  const [currentPage, setCurrectPage] = useState(1);

  function onUnfollow(id: string) {
    endpoint.post.follows['{identity_id}/unfollow'](id).then(() => setFollowingStatus('UNFOLLOW'));
  }

  function onFollow(id: string) {
    endpoint.post.follows['{identity_id}'](id).then(() => setFollowingStatus('FOLLOW'));
  }

  async function loadMore() {
    const followingsReq = getFollowings({ page: currentPage + 1 });
    setCurrectPage((prev) => prev + 1);
    setFollowings({ ...followings, ...followingsReq });
  }

  return {
    followings,
    followingStatus,
    onUnfollow,
    onFollow,
    loadMore,
  };
};
