import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { CurrentIdentity } from 'src/core/api';
import Badge from 'src/Nowruz/modules/general/components/Badge';
import store, { RootState } from 'src/store';
import { getUnreadCount } from 'src/store/thunks/chat.thunk';

export const useLinksContainer = () => {
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>((state) => {
    return state.identity.entities.find((identity) => identity.current);
  });
  const userIsLoggedIn = !!currentIdentity;
  const unread = useSelector<RootState, string>((state) => {
    return state.chat.unreadCount;
  });

  const unreadMessagesCount = async () => {
    await store.dispatch(getUnreadCount());
  };

  useEffect(() => {
    unreadMessagesCount();
  }, [userIsLoggedIn]);

  const menu = [
    {
      label: 'Dashboard',
      route: '/',
      iconName: 'home-line',
      public: false,
    },
    {
      label: 'Jobs',
      route: currentIdentity?.type === 'users' ? '/nowruz/jobs' : '/nowruz/jobs/created',
      iconName: 'briefcase-01',
      public: true,
      children: [
        { label: 'Find work', route: '/', public: true },
        { label: 'Saved jobs', route: '/', public: false },
      ],
    },
    {
      label: 'Contracts',
      route: '/nowruz/contracts',
      iconName: 'file-02',
      public: false,
    },
    {
      label: 'Communities',
      route: '/',
      iconName: 'users-01',
      public: false,
    },
    {
      label: 'Messages',
      route: '/nowruz/chats',
      iconName: 'message-square-01',
      public: false,
      // badgeIcon: unread ? <Badge content={unread.toString()} /> : '',
    },
    {
      label: 'Wallet',
      route: '/nowruz/wallet',
      iconName: 'wallet-04',
      public: false,
    },
    {
      label: 'Credentials',
      route: '/nowruz/credentials',
      iconName: 'shield-tick',
      public: false,
      only: 'organizations',
    },
  ];
  let filteredMenu = userIsLoggedIn ? menu : menu.filter((item) => item.public);

  // filter menu for role items
  filteredMenu = filteredMenu.filter((item) => !item.only || item.only === currentIdentity?.type);

  // filter menu childs for public items if user is not logged in
  if (!userIsLoggedIn) {
    filteredMenu.forEach((element) => {
      if (element.children) {
        element.children = element.children.filter((item) => item.public);
      }
    });
  }

  return { filteredMenu, userIsLoggedIn };
};
