import {
  Pagination,
  IdentityMeta,
  ParticipantsReq,
  PostMessagePayload,
  PostMessageResp,
  UserType,
} from '../../../core/types';
import { get, post } from '../../../core/http';
import { MessagesReq } from '../../../core/types';
import { Message } from '@atoms/message/message.types';
import { OnPostMessageParams, ParticipantDetail } from './message-detail.types';

export async function getMessagesById(payload: { id: string; page: number }): Promise<Pagination<MessagesReq[]>> {
  return get(`chats/${payload.id}/messages?page=${payload.page}`).then(({ data }) => data);
}

export async function postMessage(payload: PostMessagePayload): Promise<PostMessageResp> {
  return post(`chats/${payload.id}/messages`, { text: payload.text }).then(({ data }) => data);
}

export async function getParticipantsById(id: string): Promise<Pagination<ParticipantsReq[]>> {
  return get(`chats/${id}/participants`).then(({ data }) => data);
}

async function getRead(id: string, messageId: string): Promise<unknown> {
  return post(`chats/update/${id}/messages/${messageId}/read`, {}).then(({ data }) => data);
}

export async function setMessageAsRead(id: string, messageId: string): Promise<boolean> {
  return getRead(id, messageId).then(() => {
    return true;
  });
}

export async function onPostMessage(payload: OnPostMessageParams): Promise<Message> {
  const resp = await postMessage(payload);
  return {
    id: resp.id,
    identityType: payload.identity.type,
    img: payload.identity.meta.image,
    text: resp.text,
    type: 'sender',
  };
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

function getIdentityType(msgId: string, participants: ParticipantsReq[]): 'organizations' | 'users' {
  return participants.find((p) => p.identity_id === msgId)?.identity_type as 'organizations' | 'users';
}

export function getParticipantDetail(id: string, participants: ParticipantsReq[] = []): ParticipantDetail {
  const type = participants.find((p) => p.identity_id !== id)?.identity_type as UserType;
  return {
    ...(participants.find((p) => p.identity_id !== id)?.identity_meta as IdentityMeta),
    type,
  };
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
      time: msg.updated_at,
    };
  });
  return list.reverse();
}
