import { useSearchParams } from 'react-router-dom';
import { BlockedTab } from 'src/modules/connections/blockedTab';
import ConnectionTab from 'src/modules/connections/connectionTab';
import { FollowerTab } from 'src/modules/connections/followerTab';
import { FollowingTab } from 'src/modules/connections/followingTab';
import { RequestTab } from 'src/modules/connections/requestTab';

export const useConnections = () => {
  const [searchParams] = useSearchParams();
  const activeIndex = searchParams.get('active') || 0;
  const tabs = [
    { label: 'Connections', content: <ConnectionTab /> },
    { label: 'Followings', content: <FollowingTab /> },
    { label: 'Followers', content: <FollowerTab /> },
    { label: 'Requests', content: <RequestTab /> },
    { label: 'Blocked', content: <BlockedTab /> },
  ];

  return { tabs, activeIndex: Number(activeIndex) };
};
