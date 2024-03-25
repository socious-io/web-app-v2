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
      const idx = lst.findIndex((item) => item.id === id);
      if (lst[idx].following) {
        setName(lst[idx].identity_meta.name);
        setFollowingId(lst[idx].id);
        setOpenAlert(true);
      } else {
        await follow(lst[idx].identity_meta.id);
        lst[idx].following = true;
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
      const idx = lst.findIndex((item) => item.id === followingId);
      await unfollow(lst[idx].identity_meta.id);
      lst[idx].following = false;
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
