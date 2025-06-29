import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { config } from 'src/config';
import { getAuthUrlAdaptor } from 'src/core/adaptors';
import { CurrentIdentity, OrgMeta, UserMeta } from 'src/core/api';
import { isTouchDevice } from 'src/core/device-type-detector';
import { translate } from 'src/core/utils';
import store, { RootState } from 'src/store';
import { getUnreadCount } from 'src/store/thunks/chat.thunk';

import { MenuProps } from './linksContainer.types';

export const useLinksContainer = (setOpen: (val: boolean) => void) => {
  const { pathname } = useLocation();
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state => {
    return state.identity.entities.find(identity => identity.current);
  });
  const userIsLoggedIn = !!currentIdentity;
  const joinedContributors = currentIdentity?.type === 'users' && (currentIdentity.meta as UserMeta).is_contributor;
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
    {
      label: translate('nav-refer'),
      route: '/referral',
      iconName: 'star-06',
      public: false,
    },
  ];

  if (currentIdentity?.type === 'users') {
    menu.push({
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
    });
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

  const onCreateAccount = async () => {
    if (currentIdentity?.type === 'organizations') {
      localStorage.setItem('registerFor', 'user');
      const { error, data } = await getAuthUrlAdaptor(config.appBaseURL + 'oauth/socious');
      if (error) return;
      if (data) window.location.href = data.url;
    } else {
      localStorage.setItem('registerFor', 'organization');
      window.location.href =
        config.accountCenterURL + `organizations/register/pre?next=${config.appBaseURL}${pathname.slice(1)}`;
    }
  };

  return { filteredMenu, userIsLoggedIn, onLogoClick, navigateFunction, onCreateAccount };
};
