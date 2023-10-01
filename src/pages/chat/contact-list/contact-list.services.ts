import { ContactItem } from 'src/components/molecules/contact-item/contact-item.types';
import { Following } from 'src/core/api';
import { toRelativeTime } from 'src/core/relative-time';
import { RootState } from 'src/store/store';

export function chatEntityToContactListAdaptor(chatEntity: RootState['chat']['entities']): ContactItem[] {
  return chatEntity.map((item) => {
    return {
      id: item.id,
      name: item.participants[0]?.identity_meta?.name,
      text: item.last_message?.text,
      date: toRelativeTime(item.created_at),
      date2: toRelativeTime(item.updated_at),
      badge: item.unread_count,
      img:
        item.participants.length > 0
          ? item.participants[0]?.identity_meta?.avatar || item.participants[0]?.identity_meta?.image
          : '',
      type: item.participants.length > 0 ? item.participants[0]?.identity_type : 'user',
    };
  });
}

export function followingToContactListAdaptor(following: Following): ContactItem {
  return {
    id: following.id,
    name: following.meta.name,
    text: '',
    img: following.meta.hasOwnProperty('image') ? following.meta.image : following.meta.avatar,
    type: following.type,
    date: '',
    date2: '',
    badge: '',
  };
}

export function convertFollowingsToContactList(followings: Following[]): ContactItem[] {
  const mutualList = followings.filter((item) => item.mutual && item.following);
  return mutualList.map((item) => followingToContactListAdaptor(item));
}
