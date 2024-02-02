import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CurrentIdentity, chats } from 'src/core/api';
import Badge from 'src/Nowruz/modules/general/components/Badge';
import { RootState } from 'src/store';

export const useLinksContainer = () => {
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>((state) => {
    return state.identity.entities.find((identity) => identity.current);
  });
  const userIsLoggedIn = !!currentIdentity;
  const [unread, setUnread] = useState(0);

  const unreadMessagesCount = async () => {
    const unreadCount = (await chats({ limit: 1000 })).items.reduce(
      (partialSum, a) => partialSum + Number(a.unread_count),
      0,
    );
    setUnread(unreadCount);
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
      route: '/nowruz/jobs',
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
      route: '/chats',
      iconName: 'message-square-01',
      public: false,
      badgeIcon: unread ? <Badge content={unread.toString()} /> : '',
    },
    {
      label: 'Wallet',
      route: '/',
      iconName: 'wallet-04',
      public: false,
    },
  ];
  const filteredMenu = userIsLoggedIn ? menu : menu.filter((item) => item.public);

  // filter menu childs for public items if user is not logged in
  if (!userIsLoggedIn) {
    filteredMenu.forEach(element => {
      if (element.children) {
        element.children = element.children.filter(item => item.public)
      }
    });
  }

  return { filteredMenu, userIsLoggedIn };
};
