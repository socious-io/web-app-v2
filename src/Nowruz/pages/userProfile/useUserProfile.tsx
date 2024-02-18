import { useDispatch } from 'react-redux';
import { useLoaderData } from 'react-router-dom';
import { About } from 'src/Nowruz/modules/userProfile/components/about';
import { setIdentity, setIdentityType } from 'src/store/reducers/profile.reducer';

export const useUserProfile = () => {
  const dispatch = useDispatch();
  const resolver = useLoaderData() as { user: User };

  dispatch(setIdentity(resolver.user));
  dispatch(setIdentityType('users'));
  // keep these lines for now, it might be needed in V3
  // dispatch(setMissions(resolver.missions));
  // dispatch(setBadges(resolver.badges));

  const tabs = [
    { label: 'About', content: <About /> },
    { label: 'Services', content: <div /> },
    { label: 'Reviews', content: <div /> },
  ];

  return { tabs };
};
