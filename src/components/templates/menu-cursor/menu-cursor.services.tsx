import { IdentityReq } from 'src/core/types';

export type Menu = { label: string; icon: string; link: string; public: boolean };

export const menuList: Menu[] = [
  {
    label: 'Jobs',
    icon: '/icons/jobs.svg',
    link: '/jobs',
    public: true,
  },
  {
    label: 'Feeds',
    icon: '/icons/feeds.svg',
    link: '/feeds',
    public: true,
  },
  {
    label: 'Network',
    icon: '/icons/network-gray.svg',
    link: '/network',
    public: false,
  },
  {
    label: 'Chat',
    icon: '/icons/chat.svg',
    link: '/chats/contacts',
    public: false,
  },
  {
    label: 'Notifications',
    icon: '/icons/notifications.svg',
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
