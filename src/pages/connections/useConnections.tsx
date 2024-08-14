import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { BlockedTab } from 'src/modules/connections/blockedTab';
import ConnectionTab from 'src/modules/connections/connectionTab';
import { FollowerTab } from 'src/modules/connections/followerTab';
import { FollowingTab } from 'src/modules/connections/followingTab';
import { RequestTab } from 'src/modules/connections/requestTab';
export const useConnections = () => {
  const [searchParams] = useSearchParams();
  const activeIndex = searchParams.get('active') || 0;
  const { t } = useTranslation('communities');
  const tabs = [
    { label: t('communities_option_connections'), content: <ConnectionTab /> },
    { label: t('connections_following'), content: <FollowingTab /> },
    { label: t('connections_followers'), content: <FollowerTab /> },
    { label: t('connections_requests'), content: <RequestTab /> },
    { label: t('connections_blocked'), content: <BlockedTab /> },
  ];

  return { tabs, activeIndex: Number(activeIndex) };
};
