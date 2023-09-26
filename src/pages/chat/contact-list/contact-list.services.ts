import { ContactItem } from 'src/components/molecules/contact-item/contact-item.types';
import { get } from 'src/core/http';
import { toRelativeTime } from 'src/core/relative-time';
import { FollowingsReq, Pagination, SummaryReq } from 'src/core/types';
import store, { RootState } from 'src/store/store';

export async function getFollowings(payload: { page?: number; name: string }): Promise<Pagination<FollowingsReq[]>> {
  return get(`follows/followings?page=${payload?.page || ''}&name=${payload.name}`).then(({ data }) => {
    return data;
  });
}

export async function getChatsSummery(payload: { page?: number; filter: string }): Promise<SummaryReq> {
  return get(`chats/summary?limit=100&filter=${payload.filter}&page=${payload?.page || ''}`).then(({ data }) => data);
}

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

export function followingToContactListAdaptor(following: FollowingsReq): ContactItem {
  return {
    id: following.identity_id,
    name: following.identity_meta.name,
    text: '',
    img: following.identity_meta.avatar || following.identity_meta.image,
    type: following.identity_type,
    date: '',
    date2: '',
    badge: '',
  };
}

export function convertFollowingsToContactList(followings: FollowingsReq[]): ContactItem[] {
  const mutualList = followings.filter((item) => item.mutual && item.following);
  return mutualList.map((item) => followingToContactListAdaptor(item));
}
