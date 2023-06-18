import { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-location';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/store';
import { endpoint } from 'src/core/endpoints';
import { dialog } from 'src/core/dialog/dialog';
import { IdentityReq, UserType } from 'src/core/types';
import { Resolver } from './connections.types';
import { getConnections } from './connections.service';

export const useConnectionsShared = () => {
  const navigate = useNavigate();
  const identity = useSelector<RootState, IdentityReq | undefined>((state) => {
    return state.identity.entities.find((identity) => identity.current);
  });
  const initialValues = {
    items: [],
    limit: 10,
    page: 1,
    total_count: 0,
  };
  const [connectionList, setConnectionList] = useState<Resolver>(initialValues);
  const [sentRequestsList, setSentRequestsList] = useState<Resolver>(initialValues);
  const [receivedRequestsList, setReceivedRequestsList] = useState<Resolver>(initialValues);
  const [currectPages, setCurrectPages] = useState<{ connections: number; sent: number; received: number }>({
    connections: 1,
    sent: 1,
    received: 1,
  });

  useEffect(() => {
    initConnections();
  }, []);

  async function initConnections() {
    const [connectionListReq, sentRequestsListReq, receivedRequestsListReq]: Awaited<[Resolver, Resolver, Resolver]> =
      await Promise.all([
        getConnections({ page: currectPages.connections, status: 'CONNECTED' }),
        getConnections({ page: currectPages.sent, status: 'PENDING', requester_id: identity?.id }),
        getConnections({ page: currectPages.received, status: 'PENDING', requested_id: identity?.id }),
      ]);
    setConnectionList(connectionListReq);
    setSentRequestsList(sentRequestsListReq);
    setReceivedRequestsList(receivedRequestsListReq);
  }

  async function initConnectionsList() {
    const connectionListReq = await getConnections({ page: currectPages.connections, status: 'CONNECTED' });
    setConnectionList(connectionListReq);
  }

  function acceptRequest(connect_id: string) {
    endpoint.post.connections['{connect_id}/accept'](connect_id).then(() => initConnections());
  }

  async function blockRequest(connect_id: string) {
    endpoint.post.connections['{connect_id}/block'](connect_id).then(async () => {
      dialog.alert({ title: 'Blocked', message: 'You successfully blocked the feed' });
      initConnections();
    });
  }

  function onMoreClick(index: number, connect_id: string, identity_id: string, following: boolean) {
    switch (index) {
      case 0:
        try {
          if (following) {
            endpoint.post.follows['{identity_id}/unfollow'](identity_id).then(initConnectionsList);
          } else {
            endpoint.post.follows['{identity_id}'](identity_id).then(initConnectionsList);
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
        const listReq: Resolver = await getConnections({ page: currectPages.connections + 1, status: 'CONNECTED' });
        setCurrectPages({ ...currectPages, connections: currectPages.connections + 1 });
        setConnectionList({
          ...connectionList,
          ...listReq,
          total_count: connectionList.total_count + listReq.total_count,
          items: [...connectionList.items, ...listReq.items],
        });
      },
      sent: async () => {
        const listReq: Resolver = await getConnections({
          page: currectPages.sent + 1,
          status: 'PENDING',
          requester_id: identity?.id,
        });
        setCurrectPages({ ...currectPages, sent: currectPages.sent + 1 });
        setSentRequestsList({
          ...sentRequestsList,
          ...listReq,
          total_count: sentRequestsList.total_count + listReq.total_count,
          items: [...sentRequestsList.items, ...listReq.items],
        });
      },
      received: async () => {
        const listReq: Resolver = await getConnections({
          page: currectPages.received + 1,
          status: 'PENDING',
          requested_id: identity?.id,
        });
        setCurrectPages({ ...currectPages, received: currectPages.received + 1 });
        setReceivedRequestsList({
          ...receivedRequestsList,
          ...listReq,
          total_count: receivedRequestsList.total_count + listReq.total_count,
          items: [...receivedRequestsList.items, ...listReq.items],
        });
      },
    };
    req[tag]();
  }

  function onProfileClick(type: UserType, username: string) {
    if (type === 'users') {
      navigate({ to: `/profile/users/${username}/view` });
    } else {
      navigate({ to: `/profile/organizations/${username}/view` });
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
