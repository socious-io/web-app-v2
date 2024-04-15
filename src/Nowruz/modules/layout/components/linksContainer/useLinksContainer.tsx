import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CurrentIdentity, identities, OrgMeta } from 'src/core/api';
import { isTouchDevice } from 'src/core/device-type-detector';
import { nonPermanentStorage } from 'src/core/storage/non-permanent';
import Badge from 'src/Nowruz/modules/general/components/Badge';
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
      label: 'Dashboard',
      route:
        currentIdentity?.type === 'organizations'
          ? `/dashboard/${(currentIdentity?.meta as OrgMeta).shortname}/org`
          : '/dashboard/user',
      iconName: 'home-line',
      public: false,
    },
    {
      label: 'Jobs',
      route: !userIsLoggedIn || currentIdentity?.type === 'users' ? '/jobs' : '/jobs/created',
      iconName: 'briefcase-01',
      public: true,

      children:
        userIsLoggedIn && currentIdentity?.type === 'users'
          ? [
              { label: 'Find job', route: '/jobs', public: false },
              { label: 'Applied jobs', route: '/jobs/applied', public: false },
              //{ label: 'Saved jobs', route: '/', public: false },
            ]
          : undefined,
    },
    {
      label: 'Contracts',
      route: '/contracts',
      iconName: 'file-02',
      public: false,
    },

    {
      label: 'Communities',
      route: '',
      iconName: 'users-01',
      public: false,
      children: userIsLoggedIn ? [{ label: 'Connections', route: '/connections', public: false }] : [],
    },

    {
      label: 'Messages',
      route: '/chats',
      iconName: 'message-square-01',
      public: false,
      // badgeIcon: unread ? <Badge content={unread.toString()} /> : '',
    },
    {
      label: 'Payments',
      route: '/payments',
      iconName: 'wallet-04',
      public: false,
    },
    {
      label: 'Credentials',
      route: '/credentials',
      iconName: 'shield-tick',
      public: false,
    },
  ];

  if (currentIdentity?.type === 'users')
    menu.push({
      label: 'Refer and earn',
      route: '/referral',
      iconName: 'star-06',
      public: false,
    });
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

  const navigateFunction = async (route: string) => {
    localStorage.removeItem('page');
    localStorage.removeItem('searchPage');
    localStorage.removeItem('navigateToSearch');
    localStorage.removeItem('filter');
    localStorage.removeItem('searchTerm');
    localStorage.removeItem('type');
    localStorage.removeItem('source');
    localStorage.removeItem('profileJobPage');
    localStorage.removeItem('appliedJobPage');
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

  return { filteredMenu, userIsLoggedIn, navigateFunction, navigateToOnboarding };
};
