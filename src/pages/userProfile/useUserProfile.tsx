import { useDispatch, useSelector } from 'react-redux';
import { useLoaderData, useLocation } from 'react-router-dom';
import { ServicesRes } from 'src/core/adaptors';
import { CurrentIdentity, UserProfile } from 'src/core/api';
import ServicesList from 'src/modules/Services/containers/ServicesList';
import { About } from 'src/modules/userProfile/components/about';
import { RootState } from 'src/store';
import { setIdentity, setIdentityType } from 'src/store/reducers/profile.reducer';

export const useUserProfile = () => {
  const { hash } = useLocation();
  const dispatch = useDispatch();
  const { services, user } = useLoaderData() as { services: ServicesRes; user: UserProfile };
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state => {
    return state.identity.entities.find(identity => identity.current);
  });
  const myProfile = currentIdentity?.id === user?.id;
  const tabs = [
    { label: 'About', content: <About /> },
    ...(myProfile || services?.items.length
      ? [{ label: 'Services', content: <ServicesList key={user?.id || ''} /> }]
      : []),
  ];
  const activeTabIndex = {
    '#services': 1,
  };

  dispatch(setIdentity(user));
  dispatch(setIdentityType('users'));
  // keep these lines for now, it might be needed in V3
  // dispatch(setMissions(resolver.missions));
  // dispatch(setBadges(resolver.badges));

  return { tabs, activeTabIndex: activeTabIndex[hash] || 0 };
};
