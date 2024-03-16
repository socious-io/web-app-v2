import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Connection, CurrentIdentity, connections } from 'src/core/api';
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
    const blockedRes = await connections({ page, limit: PER_PAGE, 'filter.status': 'BLOCKED' });
    setBlockList(blockedRes.items);
    setTotalCount(blockedRes.total_count);
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  return { page, setPage, totalCount, PER_PAGE, blockList, currentIdentity };
};
