import { useEffect, useState } from 'react';
import { Following, follow, getFollowings, unfollow } from 'src/core/api';

export const useFollowingTab = () => {
  const [followingList, setFollowingList] = useState<Following[]>([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [openAlert, setOpenAlert] = useState(false);
  const [name, setName] = useState('');
  const [followingId, setFollowingId] = useState('');
  const PER_PAGE = 10;
  const fetchDate = async () => {
    const followingRes = await getFollowings({ page, limit: PER_PAGE });
    setTotalCount(followingRes.total_count);
    setFollowingList(followingRes.items);
  };
  useEffect(() => {
    fetchDate();
  }, [page]);
  const handleClick = async (id: string) => {
    try {
      const lst = [...followingList];
      const idx = lst.findIndex(item => item.id === id);
      const item = lst.find(item => item.id === id);
      if (!item || !item.identity_meta) return;
      if (item.following) {
        setName(item.identity_meta.name || '');
        setFollowingId(item.id);
        setOpenAlert(true);
      } else {
        await follow(item.identity_meta.id);
        item.following = true;
        lst[idx] = item;
        setFollowingList(lst);
      }
    } catch (e) {
      setOpenAlert(false);
      console.log(e);
    }
  };

  const handleUnfollow = async () => {
    try {
      const lst = [...followingList];
      const idx = lst.findIndex(item => item.id === followingId);
      const item = lst.find(item => item.id === followingId);
      if (!item || !item.identity_meta) return;
      await unfollow(item.identity_meta.id);
      item.following = false;
      lst[idx] = item;
      setFollowingList(lst);
      setOpenAlert(false);
    } catch (e) {
      console.log(e);
      setOpenAlert(false);
    }
  };

  return {
    followingList,
    page,
    setPage,
    totalCount,
    PER_PAGE,
    handleClick,
    openAlert,
    setOpenAlert,
    name,
    followingId,
    handleUnfollow,
  };
};
