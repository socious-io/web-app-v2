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
    setTotalCount(followerRes.total_count);
    setFollowerList(followerRes.items);
  };
  useEffect(() => {
    fetchDate();
  }, [page]);
  const handleClick = async (id: string) => {
    try {
      const lst = [...followerList];
      const idx = lst.findIndex(item => item.id === id);
      const item = lst.find(item => item.id === id);
      if (!item || !item.identity_meta) return;
      if (lst[idx].mutual) {
        setName(item.identity_meta.name);
        setFollowerId(item.id);
        setOpenAlert(true);
      } else {
        await follow(item.identity_meta.id);
        item.mutual = true;
        lst[idx] = item;
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
      const idx = lst.findIndex(item => item.id === followerId);
      const item = lst.find(item => item.id === followerId);
      if (!item || !item.identity_meta) return;
      await unfollow(item.identity_meta.id);
      item.mutual = false;
      lst[idx] = item;
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
