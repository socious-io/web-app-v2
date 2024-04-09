import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { CurrentIdentity, OrgMeta } from 'src/core/api';
import Badge from 'src/Nowruz/modules/general/components/Badge';
import store, { RootState } from 'src/store';
import { getUnreadCount } from 'src/store/thunks/chat.thunk';

export const useLinksContainer = () => {
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state => {
    return state.identity.entities.find(identity => identity.current);
  });
  const userIsLoggedIn = !!currentIdentity;
  const unread = useSelector<RootState, string>(state => {
    return state.chat.unreadCount;
  });

  const unreadMessagesCount = async () => {
    await store.dispatch(getUnreadCount());
  };

  useEffect(() => {
    if (userIsLoggedIn) unreadMessagesCount();
  }, [userIsLoggedIn]);

  const menu = [
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
      only: 'organizations',
    },
    {
      label: 'Refer and earn',
      route: '/referral',
      iconName: 'star-06',
      public: false,
    },
  ];

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

  return { filteredMenu, userIsLoggedIn };
};
