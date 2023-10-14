import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  connections,
  ConnectionsRes,
  connectRequestAccept,
  connectRequestReject,
  CurrentIdentity,
  follow,
  unfollow,
} from 'src/core/api';
import { dialog } from 'src/core/dialog/dialog';
import { RootState } from 'src/store';

export const useConnectionsShared = () => {
  const navigate = useNavigate();
  const identity = useSelector<RootState, CurrentIdentity | undefined>((state) => {
    return state.identity.entities.find((identity) => identity.current);
  });
  const initialValues = {
    items: [],
    limit: 10,
    page: 1,
    total_count: 0,
  };
  const [connectionList, setConnectionList] = useState<ConnectionsRes>(initialValues);
  const [sentRequestsList, setSentRequestsList] = useState<ConnectionsRes>(initialValues);
  const [receivedRequestsList, setReceivedRequestsList] = useState<ConnectionsRes>(initialValues);
  const [currectPages, setCurrectPages] = useState<{ connections: number; sent: number; received: number }>({
    connections: 1,
    sent: 1,
    received: 1,
  });

  useEffect(() => {
    initConnections();
  }, []);

  async function initConnections() {
    const [connectionListReq, sentRequestsListReq, receivedRequestsListReq]: Awaited<
      [ConnectionsRes, ConnectionsRes, ConnectionsRes]
    > = await Promise.all([
      connections({ page: currectPages.connections, 'filter.status': 'CONNECTED' }),
      connections({ page: currectPages.sent, 'filter.status': 'PENDING', 'filter.requester_id': identity?.id }),
      connections({ page: currectPages.received, 'filter.status': 'PENDING', 'filter.requested_id': identity?.id }),
    ]);
    setConnectionList(connectionListReq);
    setSentRequestsList(sentRequestsListReq);
    setReceivedRequestsList(receivedRequestsListReq);
  }

  async function initConnectionsList() {
    const connectionListReq = await connections({ page: currectPages.connections, 'filter.status': 'CONNECTED' });
    setConnectionList(connectionListReq);
  }

  function acceptRequest(connect_id: string) {
    connectRequestAccept(connect_id).then(() => initConnections());
  }

  async function blockRequest(connect_id: string) {
    connectRequestReject(connect_id).then(async () => {
      dialog.alert({ title: 'Blocked', message: 'You successfully blocked the feed' });
      initConnections();
    });
  }

  function onMoreClick(index: number, connect_id: string, identity_id: string, following: boolean) {
    switch (index) {
      case 0:
        try {
          if (following) {
            unfollow(identity_id).then(initConnections);
          } else {
            follow(identity_id).then(initConnectionsList);
          }
        } catch (err: any) {
          dialog.alert({
            message: err?.response?.data.error || err?.message,
            title: 'Error',
          });
        }
        break;
      case 1:
        blockRequest(connect_id);
        break;
    }
  }

  function loadMore(tag: string) {
    const req: Record<string, () => Promise<void>> = {
      connections: async () => {
        const listReq: ConnectionsRes = await connections({
          page: currectPages.connections + 1,
          'filter.status': 'CONNECTED',
        });
        setCurrectPages({ ...currectPages, connections: currectPages.connections + 1 });
        setConnectionList({
          ...connectionList,
          ...listReq,
          items: [...connectionList.items, ...listReq.items],
        });
      },
      sent: async () => {
        const listReq: ConnectionsRes = await connections({
          page: currectPages.sent + 1,
          'filter.status': 'PENDING',
          'filter.requester_id': identity?.id,
        });
        setCurrectPages({ ...currectPages, sent: currectPages.sent + 1 });
        setSentRequestsList({
          ...sentRequestsList,
          ...listReq,
          items: [...sentRequestsList.items, ...listReq.items],
        });
      },
      received: async () => {
        const listReq: ConnectionsRes = await connections({
          page: currectPages.received + 1,
          'filter.status': 'PENDING',
          'filter.requested_id': identity?.id,
        });
        setCurrectPages({ ...currectPages, received: currectPages.received + 1 });
        setReceivedRequestsList({
          ...receivedRequestsList,
          ...listReq,
          items: [...receivedRequestsList.items, ...listReq.items],
        });
      },
    };
    req[tag]();
  }

  function onProfileClick(type: string, username: string) {
    if (type === 'users') {
      navigate(`/profile/users/${username}/view`);
    } else {
      navigate(`/profile/organizations/${username}/view`);
    }
  }

  return {
    currentId: identity?.id,
    connectionList,
    sentRequestsList,
    receivedRequestsList,
    acceptRequest,
    onMoreClick,
    loadMore,
    onProfileClick,
  };
};
