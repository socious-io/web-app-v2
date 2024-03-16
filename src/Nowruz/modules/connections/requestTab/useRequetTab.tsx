import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Connection, CurrentIdentity, connectRequestAccept, connectRequestReject, connections } from 'src/core/api';
import { RootState } from 'src/store';

export const useRequestTab = () => {
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>((state) =>
    state.identity.entities.find((item) => item.current),
  );
  const [connectRequests, setConnectRequests] = useState<Connection[]>([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const PER_PAGE = 10;

  const fetchData = async () => {
    const requestRes = await connections({
      page,
      limit: PER_PAGE,
      'filter.status': 'PENDING',
      'filter.requested_id': currentIdentity?.id,
    });
    setConnectRequests(requestRes.items);
    setTotalCount(requestRes.total_count);
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleAccept = async (id: string) => {
    try {
      await connectRequestAccept(id);
      fetchData();
    } catch (e) {
      console.log(e);
    }
  };

  const handleReject = async (id: string) => {
    try {
      await connectRequestReject(id);
      fetchData();
    } catch (e) {
      console.log(e);
    }
  };

  return { page, setPage, connectRequests, totalCount, PER_PAGE, handleAccept, handleReject };
};
