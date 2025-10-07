import { useSearchParams } from 'react-router-dom';
import { translate } from 'src/core/utils';
import { BlockedTab } from 'src/modules/connections/blockedTab';
import ConnectionTab from 'src/modules/connections/connectionTab';
import { FollowerTab } from 'src/modules/connections/followerTab';
import { FollowingTab } from 'src/modules/connections/followingTab';
import { RequestTab } from 'src/modules/connections/requestTab';

export const useConnections = () => {
  const [searchParams] = useSearchParams();
  const activeIndex = searchParams.get('active') || 0;
  const tabs = [
    { label: translate('connect-title'), content: <ConnectionTab /> },
    { label: translate('connect-followings'), content: <FollowingTab /> },
    { label: translate('connect-followers'), content: <FollowerTab /> },
    { label: translate('connect-received-requests'), content: <RequestTab requestType="REQUESTED" /> },
    { label: translate('connect-sent-requests'), content: <RequestTab requestType="REQUESTER" /> },
    { label: translate('connect-blocked'), content: <BlockedTab /> },
  ];

  return { tabs, activeIndex: Number(activeIndex) };
};
