import { useLoaderData } from 'react-router-dom';
import { Badges } from 'src/constants/constants';
import { MissionsRes, User } from 'src/core/api';

export const useUserProfile = () => {
  const resolver = useLoaderData() as { user: User; badges: Badges; missions: MissionsRes };
  const { user, badges, missions } = resolver;
  return { user, badges, missions };
};
