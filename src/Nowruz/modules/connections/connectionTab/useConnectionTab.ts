import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLoaderData, useNavigate } from 'react-router-dom';
import {
  Connection,
  ConnectionsRes,
  CurrentIdentity,
  block,
  connections as getConnections,
  follow,
  removeConnection,
  unfollow,
} from 'src/core/api';
import { RootState } from 'src/store';

export const useConnectionTab = () => {
  const { connections } = useLoaderData() as { connections: ConnectionsRes };
  const navigate = useNavigate();

  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>((state) =>
    state.identity.entities.find((identity) => identity.current),
  );
  const [connectionList, setConnectionList] = useState<Connection[]>(connections?.items || []);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(connections?.total_count || 0);
  const [openAlert, setOpenAlert] = useState(false);
  const [fullName, setFullName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [connectionId, setConnectionId] = useState('');
  const PER_PAGE = 10;

  const fetchData = async () => {
    const res = await getConnections({ page, limit: 10, 'filter.status': 'CONNECTED' });
    setTotalCount(res.total_count);
    setConnectionList(res.items);
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const redirectToChat = (id: string) => {
    navigate(`/chats?participantId=${id}`);
  };

  const handleFollow = async (connectionId: string, otherIdentityId: string) => {
    try {
      await follow(otherIdentityId);
      fetchData();
    } catch {}
  };
  const handleUnfollow = async (connectionId: string, otherIdentityId: string) => {
    try {
      await unfollow(otherIdentityId);
      fetchData();
    } catch {}
  };

  const handleRemoveConnection = async (connectionId: string) => {
    try {
      await removeConnection(connectionId);
      await fetchData();
      setOpenAlert(false);
    } catch {}
  };
  const handleBlock = async (connectionId: string, otherIdentityId: string) => {
    try {
      await block(otherIdentityId);
      await fetchData();
    } catch {}
  };

  const handleOpenAlert = (connectionId: string, firstName: string, fullName: string) => {
    setConnectionId(connectionId);
    setFirstName(firstName);
    setFullName(fullName);
    setOpenAlert(true);
  };

  return {
    page,
    setPage,
    connectionList,
    currentIdentity,
    redirectToChat,
    handleFollow,
    handleUnfollow,
    handleRemoveConnection,
    handleBlock,
    totalCount,
    PER_PAGE,
    openAlert,
    setOpenAlert,
    handleOpenAlert,
    firstName,
    fullName,
    connectionId,
  };
};
