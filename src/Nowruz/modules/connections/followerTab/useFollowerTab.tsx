import { useEffect, useState } from 'react';
import { Following, follow, getFollowers, unfollow } from 'src/core/api';

export const useFollowerTab = () => {
  const [followerList, setFollowerList] = useState<Following[]>([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [openAlert, setOpenAlert] = useState(false);
  const [name, setName] = useState('');
  const [followerId, setFollowerId] = useState('');
  const PER_PAGE = 10;
  const fetchDate = async () => {
    const followerRes = await getFollowers({ page, limit: PER_PAGE });
    console.log('test log followerRes', followerRes);
    setTotalCount(followerRes.total_count);
    setFollowerList(followerRes.items);
  };
  useEffect(() => {
    fetchDate();
  }, [page]);
  const handleClick = async (id: string) => {
    try {
      const lst = [...followerList];
      const idx = lst.findIndex((item) => item.id === id);
      if (lst[idx].following) {
        setName(lst[idx].identity_meta.name);
        setFollowerId(lst[idx].id);
        setOpenAlert(true);
      } else {
        await follow(lst[idx].identity_meta.id);
        lst[idx].following = true;
        setFollowerList(lst);
      }
    } catch (e) {
      setOpenAlert(false);
      console.log(e);
    }
  };

  const handleUnfollow = async () => {
    try {
      const lst = [...followerList];
      const idx = lst.findIndex((item) => item.id === followerId);
      await unfollow(lst[idx].identity_meta.id);
      lst[idx].following = false;
      setFollowerList(lst);
      setOpenAlert(false);
    } catch (e) {
      console.log(e);
      setOpenAlert(false);
    }
  };

  return {
    followerList,
    page,
    setPage,
    totalCount,
    PER_PAGE,
    handleClick,
    openAlert,
    setOpenAlert,
    name,
    followerId,
    handleUnfollow,
  };
};
