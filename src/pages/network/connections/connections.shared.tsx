import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/store';
import { endpoint } from 'src/core/endpoints';
import { dialog } from 'src/core/dialog/dialog';
import { IdentityReq } from 'src/core/types';
import { Resolver } from './connections.types';
import { getConnections } from './connections.service';

export const useConnectionsShared = () => {
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

  function acceptRequest(connect_id: string) {
    endpoint.post.connections['{connect_id}/accept'](connect_id).then(() => initConnections());
  }

  async function blockRequest(connect_id: string) {
    endpoint.post.connections['{connect_id}/block'](connect_id).then(async () => {
      dialog.alert({ title: 'Blocked', message: 'You successfully blocked the feed' });
      initConnections();
    });
  }

  function onMoreClick(index: number, connect_id: string, identity_id: string) {
    switch (index) {
      case 0:
        try {
          endpoint.post.follows['{identity_id}/unfollow'](identity_id);
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
        });
      },
      sent: async () => {
        const listReq: Resolver = await getConnections({
          page: currectPages.sent + 1,
          status: 'PENDING',
          requester_id: identity?.id,
        });
        setCurrectPages({ ...currectPages, sent: currectPages.sent + 1 });
        setSentRequestsList({ ...sentRequestsList, ...listReq });
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
        });
      },
    };
    req[tag]();
  }

  return {
    currentId: identity?.id,
    connectionList,
    sentRequestsList,
    receivedRequestsList,
    acceptRequest,
    onMoreClick,
    loadMore,
  };
};
