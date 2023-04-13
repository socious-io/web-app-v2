import { get } from '../../../core/http';
import { toRelativeTime } from '../../../core/relative-time';
import { SummaryReq } from '../../../core/types';
import store, { RootState } from '../../../store/store';
import { ContactItem } from '../../../components/molecules/contact-item/contact-item.types';

export async function getChatsSummery(payload: {
  page: number;
  filter: string;
}): Promise<SummaryReq> {
  return get(`chats/summary?filter=${payload.filter}&page=${payload.page}`).then(({ data }) => {
    // store.dispatch(setChatList(data));
    return data;
  });
}

export function chatEntityToContactListAdaptor(
  chatEntity: RootState['chat']['entities']
): ContactItem[] {
  return chatEntity.map((item) => {
    return {
      id: item.id,
      name: item.participants[0]?.identity_meta?.name,
      text: item.last_message?.text,
      date: toRelativeTime(item.created_at),
      date2: toRelativeTime(item.updated_at),
      badge: item.unread_count,
      img: item.participants.length > 0 ? item.participants[0]?.identity_meta?.avatar : '',
      type: item.participants.length > 0 ? item.participants[0]?.identity_type : 'user',
    };
  });
}
