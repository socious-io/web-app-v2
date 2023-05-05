import { IdentityReq } from 'src/core/types';

export const menuList = [
  {
    label: 'Jobs',
    icon: '/icons/jobs.svg',
  },
  {
    label: 'Network',
    icon: '/icons/network-gray.svg',
  },
  {
    label: 'Feeds',
    icon: '/icons/feeds.svg',
  },
  {
    label: 'Chat',
    icon: '/icons/chat.svg',
  },
  {
    label: 'Notifications',
    icon: '/icons/notifications.svg',
  },
];

export function getAvatar(identity: IdentityReq) {
  return identity.type === 'organizations' ? identity.meta.image : identity.meta.avatar;
}
