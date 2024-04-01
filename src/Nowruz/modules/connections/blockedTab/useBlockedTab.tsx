import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Connection, CurrentIdentity, connections, removeConnection } from 'src/core/api';
import { RootState } from 'src/store';

export const useBlockedTab = () => {
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>((state) =>
    state.identity.entities.find((identity) => identity.current),
  );

  const [blockList, setBlockList] = useState<Connection[]>([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const PER_PAGE = 10;
  const fetchData = async () => {
    try {
      const blockedRes = await connections({ page, limit: PER_PAGE, 'filter.status': 'BLOCKED' });
      setBlockList(blockedRes.items);
      setTotalCount(blockedRes.total_count);
    } catch (e) {
      console.log('error in fetching blocked connections', e);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleUnblock = async (connectionId: string) => {
    try {
      await removeConnection(connectionId);
      fetchData();
    } catch (error) {
      console.log('error in unblocking', error);
    }
  };

  return { page, setPage, totalCount, PER_PAGE, blockList, currentIdentity, handleUnblock };
};
