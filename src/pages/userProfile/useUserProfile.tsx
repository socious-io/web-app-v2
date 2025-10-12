import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLoaderData, useLocation } from 'react-router-dom';
import { Organization, PublicUser, User } from 'src/core/api';
import { translate } from 'src/core/utils';
import ReviewsList from 'src/modules/Reviews/containers/ReviewsList';
import ServicesList from 'src/modules/Services/containers/ServicesList';
import { About } from 'src/modules/userProfile/components/about';
import { RootState } from 'src/store';
import { setIdentity, setIdentityType } from 'src/store/reducers/profile.reducer';

export const useUserProfile = () => {
  const dispatch = useDispatch();
  const { hash } = useLocation();
  const { user, tags } = useLoaderData() as { user: PublicUser; tags: string[] };
  const currentUser = useSelector<RootState, User | Organization | undefined>(state => state.profile.identity) as User;

  useEffect(() => {
    dispatch(setIdentity(user));
    dispatch(setIdentityType('users'));
  }, [dispatch, user]);

  const tabs = [
    { label: translate('user-profile.about'), content: <About /> },
    { label: translate('user-profile.services'), content: <ServicesList /> },
    { label: translate('user-profile.reviews'), content: <ReviewsList /> },
  ];

  const activeTabIndexes = {
    '#about': 0,
    '#services': 1,
    '#reviews': 2,
  };

  return {
    data: {
      currentUser,
      tabs,
      activeTabIndex: activeTabIndexes[hash] || 0,
      userTags: tags,
    },
  };
};
