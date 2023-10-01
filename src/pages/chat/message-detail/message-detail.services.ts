import { Message as MessageRes } from 'src/components/atoms/message/message.types';
import { createChatMessage, Message, Participant } from 'src/core/api';
import { post } from 'src/core/http';
import { IdentityMeta, ParticipantsReq, PostMessagePayload, PostMessageResp, UserType } from 'src/core/types';
import { MessagesReq } from 'src/core/types';

import { OnPostMessageParams, ParticipantDetail } from './message-detail.types';

// export async function getMessagesById(payload: { id: string; page: number }): Promise<Pagination<MessagesReq[]>> {
//   return get(`chats/${payload.id}/messages?page=${payload.page}`).then(({ data }) => data);
// }

export async function postMessage(payload: PostMessagePayload): Promise<PostMessageResp> {
  return post(`chats/${payload.id}/messages`, { text: payload.text }).then(({ data }) => data);
}

// export async function getParticipantsById(id: string): Promise<Pagination<ParticipantsReq[]>> {
//   return get(`chats/${id}/participants`).then(({ data }) => data);
// }

// async function getRead(id: string, messageId: string): Promise<unknown> {
//   return post(`chats/update/${id}/messages/${messageId}/read`, {}).then(({ data }) => data);
// }

// export async function setMessageAsRead(id: string, messageId: string): Promise<boolean> {
//   return getRead(id, messageId).then(() => {
//     return true;
//   });
// }

export async function onPostMessage(payload: OnPostMessageParams): Promise<MessageRes> {
  const resp = await createChatMessage(payload.id, { text: payload.text });

  return {
    id: resp.id,
    identityType: payload.identity.type,
    img: payload.identity.meta.image || '',
    text: resp.text,
    type: 'sender',
    time: resp.created_at.toString(),
  };
}

function getImage(myId: string, msgId: string, participants: Participant[]): string {
  const msgIsMine = msgId === myId;
  const participant = participants.find((p) => p.id === msgId);
  if (msgIsMine) {
    return 'image' in participant!.meta ? participant!.meta.image : '';
  } else {
    return 'avatar' in participant!.meta ? participant!.meta.avatar || '' : '';
  }
}

function getIdentityType(msgId: string, participants: Participant[]): 'organizations' | 'users' {
  return participants.find((p) => p.id === msgId)?.type as 'organizations' | 'users';
}

export function getParticipantDetail(id: string, participants: Participant[] = []): Participant {
  return participants.find((p) => p.id !== id) || ({} as Participant);
}

export function chatListAdaptor(
  myId: string,
  messagesList: Message[] = [],
  participants: Participant[] = [],
): MessageRes[] {
  const list = messagesList.map((msg) => {
    const isMyMessage = msg.identity_id === myId;
    return {
      id: msg.id,
      type: isMyMessage ? 'sender' : ('receiver' as 'sender' | 'receiver'),
      text: msg.text,
      identityType: getIdentityType(msg.id, participants),
      img: getImage(myId, msg.identity_id, participants),
      time: msg.updated_at.toString(),
    };
  });

  return list.reverse();
}
