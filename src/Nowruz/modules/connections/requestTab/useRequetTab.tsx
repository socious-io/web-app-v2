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
  const [openAcceptModal, setOpenAcceptModal] = useState(false);
  const [requestedId, setRequestedId] = useState('');
  const [selectedRequest, setselectedRequest] = useState<Connection>();
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

  const handleAccept = async () => {
    try {
      await connectRequestAccept(requestedId);
      await fetchData();
    } catch (e) {
      console.log(e);
    }
    setOpenAcceptModal(false);
  };

  const handleReject = async (id?: string) => {
    try {
      const connectionId = id || requestedId;
      await connectRequestReject(connectionId);
      await fetchData();
    } catch (e) {
      console.log(e);
    }
    setOpenAcceptModal(false);
  };

  const handleOpenAcceptModal = (id: string) => {
    setRequestedId(id);
    const req = connectRequests.find((item) => item.id === id);
    setselectedRequest(req);
    setOpenAcceptModal(true);
  };

  return {
    page,
    setPage,
    connectRequests,
    totalCount,
    PER_PAGE,
    handleAccept,
    handleReject,
    openAcceptModal,
    setOpenAcceptModal,
    handleOpenAcceptModal,
    selectedRequest,
  };
};
