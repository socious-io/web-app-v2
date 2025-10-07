import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Connection, CurrentIdentity, connectRequestAccept, connectRequestReject, connections } from 'src/core/api';
import { RootState } from 'src/store';

import { RequestTabProps } from './index.types';

export const useRequestTab = (requestType: RequestTabProps['requestType']) => {
  const PER_PAGE = 10;
  const isRequestedType = requestType === 'REQUESTED';
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state =>
    state.identity.entities.find(item => item.current),
  );
  const [connectRequests, setConnectRequests] = useState<Connection[]>([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [openAcceptModal, setOpenAcceptModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<Connection>();
  const selectedId = selectedRequest?.id || '';

  const fetchData = async () => {
    const requestRes = await connections({
      page,
      limit: PER_PAGE,
      'filter.status': 'PENDING',
      [isRequestedType ? 'filter.requested_id' : 'filter.requester_id']: currentIdentity?.id,
    });

    setConnectRequests(requestRes.items);
    setTotalCount(requestRes.total_count);
  };

  useEffect(() => {
    fetchData();
  }, [page, isRequestedType]);

  const handleAccept = async () => {
    if (!selectedId) return;
    try {
      await connectRequestAccept(selectedId);
      await fetchData();
    } catch (e) {
      console.log(e);
    }
    setOpenAcceptModal(false);
  };

  const handleReject = async (id?: string) => {
    const connectionId = id || selectedId;
    if (!connectionId) return;
    try {
      await connectRequestReject(connectionId);
      await fetchData();
    } catch (e) {
      console.log(e);
    }
    setOpenAcceptModal(false);
  };

  const handleOpenAcceptModal = (id: string) => {
    const req = connectRequests.find(item => item.id === id);
    setSelectedRequest(req);
    setOpenAcceptModal(true);
  };

  const getAccount = (request: Connection | undefined) => {
    return isRequestedType ? request?.requester : request?.requested;
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
    isRequestedType,
    getAccount,
  };
};
