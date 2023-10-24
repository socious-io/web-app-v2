import { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { follow, FollowingRes, getFollowings, unfollow } from 'src/core/api';

export const useFollowingsShared = () => {
  const navigate = useNavigate();
  const resolver = (useLoaderData() as FollowingRes) || {};
  const [followings, setFollowings] = useState(resolver);
  const [followingStatus, setFollowingStatus] = useState<{ [x: string]: 'FOLLOW' | 'UNFOLLOW' }>({});
  const [currentPage, setCurrectPage] = useState(1);

  function onUnfollow(id: string) {
    unfollow(id).then(() => setFollowingStatus({ ...followingStatus, [id]: 'UNFOLLOW' }));
  }

  function onFollow(id: string) {
    follow(id).then(() => setFollowingStatus({ ...followingStatus, [id]: 'FOLLOW' }));
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

  function onProfileClick(type: string, username: string) {
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
