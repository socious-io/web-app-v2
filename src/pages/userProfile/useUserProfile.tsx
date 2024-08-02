import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useLoaderData } from 'react-router-dom';
import { UserProfile } from 'src/core/api';
import { About } from 'src/modules/userProfile/components/about';
import { setIdentity, setIdentityType } from 'src/store/reducers/profile.reducer';
export const useUserProfile = () => {
  const dispatch = useDispatch();
  const resolver = useLoaderData() as { user: UserProfile };
  const { t } = useTranslation('profile');
  dispatch(setIdentity(resolver.user));
  dispatch(setIdentityType('users'));
  // keep these lines for now, it might be needed in V3
  // dispatch(setMissions(resolver.missions));
  // dispatch(setBadges(resolver.badges));
  const tabs = [{ label: t('aboutHeading'), content: <About /> }];

  return { tabs };
};
