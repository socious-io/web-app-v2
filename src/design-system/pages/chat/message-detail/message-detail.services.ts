import {
  Pagination,
  IdentityMeta,
  ParticipantsReq,
  PostMessagePayload,
  PostMessageResp,
} from './../../../../core/types';
import { get, post } from '../../../../core/http';
import { MessagesReq } from '../../../../core/types';
import { Message } from '../../../atoms/message/message.types';

export async function getMessagesById(payload: { id: string; page: number }): Promise<MessagesReq> {
  return get(`chats/${payload.id}/messages?page=${payload.page}`).then(({ data }) => data.items);
}

export async function getParticipantsById(id: string): Promise<MessagesReq> {
  return get(`chats/${id}/participants`).then(({ data }) => data.items);
}

function getImage(myId: string, msgId: string, participants: ParticipantsReq[]): string {
  const msgIsMine = msgId === myId;
  const participant = participants.find((p) => p.identity_id === msgId);
  if (msgIsMine) {
    return participant?.identity_meta.image ?? '';
  } else {
    return participant?.identity_meta.avatar ?? '';
  }
}

function getIdentityType(
  msgId: string,
  participants: ParticipantsReq[]
): 'organizations' | 'users' {
  return participants.find((p) => p.identity_id === msgId)?.identity_type as
    | 'organizations'
    | 'users';
}

export function getParticipantDetail(
  id: string,
  participants: ParticipantsReq[] = []
): IdentityMeta {
  return participants.find((p) => p.identity_id !== id)?.identity_meta as IdentityMeta;
}

export function chatListAdaptor(
  myId: string,
  messagesList: MessagesReq[] = [],
  participants: ParticipantsReq[] = []
): Message[] {
  const list = messagesList.map((msg) => {
    const isMyMessage = msg.identity_id === myId;
    return {
      id: msg.id,
      type: isMyMessage ? 'sender' : ('receiver' as 'sender' | 'receiver'),
      text: msg.text,
      identityType: getIdentityType(msg.id, participants),
      img: getImage(myId, msg.identity_id, participants),
    };
  });
  return list.reverse();
}
