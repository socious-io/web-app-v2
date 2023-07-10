import { Link } from '@tanstack/react-location';
import { IdentityReq } from 'src/core/types';

export type Menu = { label: string; icon: string; link: string };
export const menuList: Menu[] = [
  {
    label: 'Jobs',
    icon: '/icons/jobs.svg',
    link: '/jobs',
  },
  {
    label: 'Network',
    icon: '/icons/network-gray.svg',
    link: '/network',
  },
  {
    label: 'Feeds',
    icon: '/icons/feeds.svg',
    link: '/feeds',
  },
  {
    label: 'Chat',
    icon: '/icons/chat.svg',
    link: '/chats/contacts',
  },
  {
    label: 'Notifications',
    icon: '/icons/notifications.svg',
    link: '/notifications',
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

export function getAvatar(identity: IdentityReq) {
  return identity.type === 'organizations' ? identity.meta.image : identity.meta.avatar;
}
