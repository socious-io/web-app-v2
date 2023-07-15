import { IdentityReq } from 'src/core/types';

export type Menu = {
  label: string;
  icons: {
    nonActive: {
      mobile: string;
      desktop: string;
    };
    active: {
      mobile: string;
      desktop: string;
    };
  };
  link: string;
  public: boolean;
};

export const menuList: Menu[] = [
  {
    label: 'Jobs',
    icons: {
      nonActive: {
        mobile: '/icons/menu/jobs.svg',
        desktop: '/icons/jobs.svg',
      },
      active: {
        mobile: '/icons/menu/jobs-active.svg',
        desktop: '/icons/jobs-active.svg',
      },
    },
    link: '/jobs',
    public: true,
  },
  {
    label: 'Feeds',
    icons: {
      nonActive: {
        mobile: '/icons/menu/feeds.svg',
        desktop: '/icons/feeds.svg',
      },
      active: {
        mobile: '/icons/menu/feeds-active.svg',
        desktop: '/icons/feeds-active.svg',
      },
    },
    link: '/feeds',
    public: true,
  },
  {
    label: 'Network',
    icons: {
      nonActive: {
        mobile: '/icons/menu/network-gray.svg',
        desktop: '/icons/network-gray.svg',
      },
      active: {
        mobile: '/icons/menu/network-gray-active.svg',
        desktop: '/icons/network-gray-active.svg',
      },
    },
    link: '/network',
    public: false,
  },
  {
    label: 'Chat',
    icons: {
      nonActive: {
        mobile: '/icons/menu/chat.svg',
        desktop: '/icons/chat.svg',
      },
      active: {
        mobile: '/icons/menu/chat-active.svg',
        desktop: '/icons/chat-active.svg',
      },
    },
    link: '/chats/contacts',
    public: false,
  },
  {
    label: 'Notifications',
    icons: {
      nonActive: {
        mobile: '/icons/menu/notifications.svg',
        desktop: '/icons/notifications.svg',
      },
      active: {
        mobile: '/icons/menu/notifications-active.svg',
        desktop: '/icons/notifications-active.svg',
      },
    },
    link: '/notifications',
    public: false,
  },
];

export const settingsList = [
  {
    label: 'Privacy policy',
    icon: '',
  },
  {
    label: 'Terms & conditions',
    icon: '',
  },
  {
    label: 'Change password',
    icon: '',
  },
];

export function getAvatar(identity?: IdentityReq) {
  return identity?.type === 'organizations' ? identity.meta.image : identity?.meta.avatar;
}
