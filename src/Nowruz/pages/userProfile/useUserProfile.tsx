import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLoaderData } from 'react-router-dom';
import { Badges } from 'src/constants/constants';
import { connectionStatus, ConnectStatus, CurrentIdentity, MissionsRes, User } from 'src/core/api';
import { About } from 'src/Nowruz/modules/userProfile/components/about';
import { RootState } from 'src/store';

export const useUserProfile = () => {
  const resolver = useLoaderData() as { user: User; badges: Badges; missions: MissionsRes };
  const { user, badges, missions } = resolver;
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>((state) => {
    return state.identity.entities.find((identity) => identity.current);
  });
  const myProfile = currentIdentity?.id === user.id;
  const isLoggedIn = !!currentIdentity;
  const [connectStatus, setConnectStatus] = useState<ConnectStatus | undefined>(undefined);

  useEffect(() => {
    const getConnectionsStatus = async () => {
      const res = await connectionStatus(user.id);
      setConnectStatus(res?.connect?.status);
    };
    getConnectionsStatus();
  }, []);

  const tabs = [
    { label: 'About', content: <About user={user} myProfile={myProfile} /> },
    { label: 'Services', content: <div /> },
    { label: 'Reviews', content: <div /> },
  ];

  return { user, badges, missions, tabs, myProfile, connectStatus, isLoggedIn };
};
