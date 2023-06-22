import { useState } from 'react';
import { useMatch, useNavigate } from '@tanstack/react-location';
import { endpoint } from 'src/core/endpoints';
import { FollowingsReq, Pagination, UserType } from 'src/core/types';
import { getFollowings } from './followings.service';

export const useFollowingsShared = () => {
  const navigate = useNavigate();
  const resolver = (useMatch().ownData as Pagination<FollowingsReq[]>) || {};
  const [followings, setFollowings] = useState(resolver);
  const [followingStatus, setFollowingStatus] = useState<{ id: string; status: 'FOLLOW' | 'UNFOLLOW' }>({
    id: '',
    status: 'FOLLOW',
  });
  const [currentPage, setCurrectPage] = useState(1);

  function onUnfollow(id: string) {
    endpoint.post.follows['{identity_id}/unfollow'](id).then(() => setFollowingStatus({ id, status: 'UNFOLLOW' }));
  }

  function onFollow(id: string) {
    endpoint.post.follows['{identity_id}'](id).then(() => setFollowingStatus({ id, status: 'FOLLOW' }));
  }

  async function loadMore() {
    const followingsReq = await getFollowings({ page: currentPage + 1 });
    setCurrectPage((prev) => prev + 1);
    setFollowings({
      ...followings,
      ...followingsReq,
      total_count: followings.total_count + followingsReq.total_count,
      items: [...followings.items, ...followingsReq.items],
    });
  }

  function followStatusUser(id: string) {
    if (followingStatus.id === id || !followingStatus.id) {
      return followingStatus.status === 'FOLLOW';
    }
  }

  function onProfileClick(type: UserType, username: string) {
    if (type === 'users') {
      navigate({ to: `/profile/users/${username}/view` });
    } else {
      navigate({ to: `/profile/organizations/${username}/view` });
    }
  }

  return {
    followings,
    followStatusUser,
    onUnfollow,
    onFollow,
    loadMore,
    onProfileClick,
  };
};
