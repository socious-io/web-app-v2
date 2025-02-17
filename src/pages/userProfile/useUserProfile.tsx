import { useDispatch, useSelector } from 'react-redux';
import { useLoaderData, useLocation } from 'react-router-dom';
import { ServicesRes } from 'src/core/adaptors';
import { CurrentIdentity, UserProfile } from 'src/core/api';
import { translate } from 'src/core/utils';
import ReviewsList from 'src/modules/Reviews/containers/ReviewsList';
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
    { label: translate('user-profile.about'), content: <About /> },
    ...(myProfile || services?.items.length
      ? [{ label: translate('user-profile.services'), content: <ServicesList /> }]
      : []),
    { label: translate('user-profile.reviews'), content: <ReviewsList /> },
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
