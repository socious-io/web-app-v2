import { useDispatch } from 'react-redux';
import { useLoaderData } from 'react-router-dom';
import { Badges } from 'src/constants/constants';
import { badges, MissionsRes, User } from 'src/core/api';
import { About } from 'src/Nowruz/modules/userProfile/components/about';
import { setUser, setBadges, setMissions } from 'src/store/reducers/profile.reducer';

export const useUserProfile = () => {
  const dispatch = useDispatch();
  const resolver = useLoaderData() as { user: User; badges: Badges; missions: MissionsRes };

  dispatch(setUser(resolver.user));
  dispatch(setMissions(resolver.missions));
  dispatch(setBadges(resolver.badges));

  const tabs = [
    { label: 'About', content: <About /> },
    { label: 'Services', content: <div /> },
    { label: 'Reviews', content: <div /> },
  ];

  return { tabs };
};
