import { useState } from 'react';
import { endpoint } from 'src/core/endpoints';
import { FollowingsReq, Pagination, UserType } from 'src/core/types';

import { getFollowings } from './followings.service';
import { useNavigate } from 'react-router-dom';

export const useFollowingsShared = () => {
  const navigate = useNavigate();
  const resolver = (useMatch().ownData as Pagination<FollowingsReq[]>) || {};
  const [followings, setFollowings] = useState(resolver);
  const [followingStatus, setFollowingStatus] = useState<{ [x: string]: 'FOLLOW' | 'UNFOLLOW' }>({});
  const [currentPage, setCurrectPage] = useState(1);

  function onUnfollow(id: string) {
    endpoint.post.follows['{identity_id}/unfollow'](id).then(() =>
      setFollowingStatus({ ...followingStatus, [id]: 'UNFOLLOW' }),
    );
  }

  function onFollow(id: string) {
    endpoint.post.follows['{identity_id}'](id).then(() => setFollowingStatus({ ...followingStatus, [id]: 'FOLLOW' }));
  }

  async function loadMore() {
    const followingsReq = await getFollowings({ page: currentPage + 1 });
    setCurrectPage((prev) => prev + 1);
    setFollowings({
      ...followings,
      ...followingsReq,
      items: [...followings.items, ...followingsReq.items],
    });
  }

  function followStatusUser(id: string) {
    if (!Object.keys(followingStatus).length) {
      return true;
    }
    return followingStatus[id] !== 'UNFOLLOW';
  }

  function onProfileClick(type: UserType, username: string) {
    if (type === 'users') {
      navigate(`/profile/users/${username}/view`);
    } else {
      navigate(`/profile/organizations/${username}/view`);
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
