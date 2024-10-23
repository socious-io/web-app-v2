import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CurrentIdentity, identities, OrgMeta, UserMeta } from 'src/core/api';
import { isTouchDevice } from 'src/core/device-type-detector';
import { nonPermanentStorage } from 'src/core/storage/non-permanent';
import { translate } from 'src/core/utils';
import Badge from 'src/modules/general/components/Badge';
import store, { RootState } from 'src/store';
import { setIdentityList } from 'src/store/reducers/identity.reducer';
import { getUnreadCount } from 'src/store/thunks/chat.thunk';

import { MenuProps } from './linksContainer.types';

export const useLinksContainer = (setOpen: (val: boolean) => void) => {
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state => {
    return state.identity.entities.find(identity => identity.current);
  });
  const allIdentities = useSelector<RootState, CurrentIdentity[]>(state => {
    return state.identity.entities;
  });
  const unread = useSelector<RootState, string>(state => {
    return state.chat.unreadCount;
  });
  const userIsLoggedIn = !!currentIdentity;
  const joinedContributors = currentIdentity?.type === 'users' && (currentIdentity.meta as UserMeta).is_contributor;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userIsLoggedIn) unreadMessagesCount();
  }, [userIsLoggedIn]);

  const unreadMessagesCount = async () => {
    await store.dispatch(getUnreadCount());
  };

  const menu: MenuProps[] = [
    {
      label: translate('nav-dashboard'),
      route:
        currentIdentity?.type === 'organizations'
          ? `/dashboard/${(currentIdentity?.meta as OrgMeta).shortname}/org`
          : '/dashboard/user',
      iconName: 'home-line',
      public: false,
    },
    {
      label: translate('nav-jobs'),
      route: !userIsLoggedIn || currentIdentity?.type === 'users' ? '/jobs' : '/jobs/created',
      iconName: 'briefcase-01',
      public: true,

      children:
        userIsLoggedIn && currentIdentity?.type === 'users'
          ? [
              { label: translate('nav-find-job'), route: '/jobs', public: false },
              { label: translate('nav-saved-jobs'), route: '/jobs/saved', public: false },
              { label: translate('nav-applied-jobs'), route: '/jobs/applied', public: false },
            ]
          : undefined,
    },
    {
      label: translate('nav-contracts'),
      route: '',
      iconName: 'file-02',
      public: false,
      children: userIsLoggedIn
        ? [
            { label: translate('nav-overview'), route: '/contracts', public: false },
            { label: translate('nav-disputes'), route: '/disputes', public: false },
          ]
        : [],
    },

    {
      label: translate('nav-communities'),
      route: '',
      iconName: 'users-01',
      public: false,
      children: userIsLoggedIn
        ? [
            { label: translate('nav-feeds'), route: '/feeds', public: false },
            { label: translate('nav-connections'), route: '/connections', public: false },
          ]
        : [],
    },

    {
      label: translate('nav-messages'),
      route: '/chats',
      iconName: 'message-square-01',
      public: false,
      // badgeIcon: unread ? <Badge content={unread.toString()} /> : '',
    },
    {
      label: translate('nav-payments'),
      route: '/payments',
      iconName: 'wallet-04',
      public: false,
    },
    {
      label: translate('nav-credentials'),
      route: '/credentials',
      iconName: 'shield-tick',
      public: false,
    },
  ];

  if (currentIdentity?.type === 'users') {
    menu.push(
      {
        label: translate('nav-refer'),
        route: '/referral',
        iconName: 'star-06',
        public: false,
      },
      {
        label: translate('nav-contributor'),
        route: '',
        iconName: 'heart-hand',
        public: false,
        children: [
          {
            label: translate('nav-contributor-dashboard'),
            route: `/${(currentIdentity.meta as UserMeta).username}/contribute`,
            public: false,
          },
        ].concat(
          joinedContributors
            ? [
                {
                  label: translate('nav-dispute-resolution'),
                  route: `/${(currentIdentity.meta as UserMeta).username}/contribute/center`,
                  public: false,
                },
              ]
            : [],
        ),
      },
    );
  }
  let filteredMenu = userIsLoggedIn ? menu : menu.filter(item => item.public);

  // filter menu for role items
  filteredMenu = filteredMenu.filter(item => !item.only || item.only === currentIdentity?.type);

  // filter menu childs for public items if user is not logged in
  if (!userIsLoggedIn) {
    filteredMenu.forEach(element => {
      if (element.children) {
        element.children = element.children.filter(item => item.public);
      }
    });
  }

  const onLogoClick = () => {
    if (currentIdentity?.type === 'organizations') {
      navigateFunction(`/dashboard/${(currentIdentity?.meta as OrgMeta).shortname}/org`);
    } else {
      navigateFunction('/dashboard/user');
    }
  };

  const navigateFunction = async (route: string) => {
    localStorage.removeItem('page');
    localStorage.removeItem('navigateToSearch');
    localStorage.removeItem('filter');
    localStorage.removeItem('searchTerm');
    localStorage.removeItem('type');
    localStorage.removeItem('source');
    localStorage.removeItem('profileJobPage');
    navigate(route);
    if (isTouchDevice()) setOpen(false);
  };

  const navigateToOnboarding = async () => {
    if (currentIdentity?.type === 'organizations') {
      localStorage.setItem('registerFor', 'user');
      const userAccount = allIdentities.find(a => a.type === 'users');
      if (userAccount?.id) await nonPermanentStorage.set({ key: 'identity', value: userAccount.id });
      const identityList = await identities();
      dispatch(setIdentityList(identityList));
    } else {
      localStorage.setItem('registerFor', 'organization');
    }
    navigate('/sign-up/user/onboarding');
  };

  return { filteredMenu, userIsLoggedIn, onLogoClick, navigateFunction, navigateToOnboarding };
};
