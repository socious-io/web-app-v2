import { useLoaderData } from 'react-router-dom';
import { Badges } from 'src/constants/constants';
import { MissionsRes, User } from 'src/core/api';
import { About } from 'src/Nowruz/modules/userProfile/components/about';

export const useUserProfile = () => {
  const resolver = useLoaderData() as { user: User; badges: Badges; missions: MissionsRes };
  const { user, badges, missions } = resolver;

  const tabs = [
    { label: 'About', content: <About user={user} /> },
    { label: 'Services', content: <div /> },
    { label: 'Reviews', content: <div /> },
  ];

  return { user, badges, missions, tabs };
};
