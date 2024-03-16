import { useEffect, useState } from 'react';
import { Connection, connections } from 'src/core/api';
import ConnectionTab from 'src/Nowruz/modules/connections/connectionTab';
import { FollowerTab } from 'src/Nowruz/modules/connections/followerTab';
import { FollowingTab } from 'src/Nowruz/modules/connections/followingTab';
import { RequestTab } from 'src/Nowruz/modules/connections/requestTab';
import { useIsMount } from 'src/Nowruz/modules/general/components/useIsMount';

export const useConnections = () => {
  const [blockList, setBlockList] = useState<Connection[]>([]);
  const isMount = useIsMount();

  const initialize = async () => {
    const blockedRes = await connections({ page: 1, 'filter.status': 'BLOCKED' });
    setBlockList(blockedRes.items);
  };

  useEffect(() => {
    if (!isMount) initialize();
  }, []);

  const tabs = [
    { label: 'Connections', content: <ConnectionTab /> },
    { label: 'Followings', content: <FollowingTab /> },
    { label: 'Followers', content: <FollowerTab /> },
    { label: 'Requests', content: <RequestTab /> },
    { label: 'Blocked', content: <div /> },
  ];

  return { tabs };
};
