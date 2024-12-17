import { useDispatch } from 'react-redux';
import { useLoaderData, useLocation } from 'react-router-dom';
import { UserProfile } from 'src/core/api';
import ServicesList from 'src/modules/Services/containers/ServicesList';
import { About } from 'src/modules/userProfile/components/about';
import { setIdentity, setIdentityType } from 'src/store/reducers/profile.reducer';

export const useUserProfile = () => {
  const { hash } = useLocation();
  const dispatch = useDispatch();
  const resolver = useLoaderData() as { user: UserProfile };

  dispatch(setIdentity(resolver.user));
  dispatch(setIdentityType('users'));
  // keep these lines for now, it might be needed in V3
  // dispatch(setMissions(resolver.missions));
  // dispatch(setBadges(resolver.badges));

  const tabs = [
    { label: 'About', content: <About /> },
    { label: 'Services', content: <ServicesList /> },
  ];
  const activeTabIndex = {
    '#services': 1,
  };

  return { tabs, activeTabIndex: activeTabIndex[hash] || 0 };
};
