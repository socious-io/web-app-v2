import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Connection, CurrentIdentity, Following, connections, getFollowings } from 'src/core/api';
import ConnectionTab from 'src/Nowruz/modules/connections/connectionTab';
import { useIsMount } from 'src/Nowruz/modules/general/components/useIsMount';
import { RootState } from 'src/store';

export const useConnections = () => {
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>((state) =>
    state.identity.entities.find((item) => item.current),
  );

  const [followingList, setFollowingList] = useState<Following[]>([]);
  const [connectRequests, setConnectRequests] = useState<Connection[]>([]);
  const [blockList, setBlockList] = useState<Connection[]>([]);
  const isMount = useIsMount();

  const initialize = async () => {
    const followingRes = await getFollowings({ page: 1, limit: 10 });
    setFollowingList(followingRes.items);
    const requestRes = await connections({
      page: 1,
      'filter.status': 'PENDING',
      'filter.requested_id': currentIdentity?.id,
    });
    setConnectRequests(requestRes.items);
    const blockedRes = await connections({ page: 1, 'filter.status': 'BLOCKED' });
    setBlockList(blockedRes.items);
  };

  useEffect(() => {
    if (!isMount) initialize();
  }, []);

  const tabs = [
    { label: 'Connections', content: <ConnectionTab /> },
    { label: 'Followings', content: <div /> },
    { label: 'Followers', content: <div /> },
    { label: 'Requests', content: <div /> },
    { label: 'Blocked', content: <div /> },
  ];

  return { tabs };
};
