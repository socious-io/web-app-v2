import { ContactItem } from 'src/components/molecules/contact-item/contact-item.types';
import { Chat, Following } from 'src/core/api';
import { toRelativeTime } from 'src/core/relative-time';

export function chatEntityToContactListAdaptor(chatEntity: Chat[]): ContactItem[] {
  return chatEntity.map((item) => {
    const participant = item.participants[0];
    const participantName = participant?.identity_meta.name || '';
    return {
      id: item.id,
      name: participantName,
      text: item.last_message?.text,
      date: toRelativeTime(item.created_at.toString()),
      date2: toRelativeTime(item.updated_at.toString()),
      badge: item.unread_count,
      img:
        item.participants.length > 0 ? participant?.identity_meta.avatar || participant?.identity_meta.image || '' : '',
      type: participant?.identity_type || 'users',
    };
  });
}

export function followingToContactListAdaptor(following: Following): ContactItem {
  return {
    id: following.identity_id,
    name: following.identity_meta.name,
    text: '',
    img: following.identity_meta.image || following.identity_meta.avatar || '',
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
