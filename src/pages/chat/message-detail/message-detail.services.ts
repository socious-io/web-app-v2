import { Message as MessageRes } from 'src/components/atoms/message/message.types';
import { createChatMessage, Message, OrgMeta, Participant, UserMeta } from 'src/core/api';

import { OnPostMessageParams } from './message-detail.types';

export async function onPostMessage(payload: OnPostMessageParams): Promise<MessageRes> {
  const resp = await createChatMessage(payload.id, { text: payload.text });

  return {
    id: resp.id,
    identityType: payload.identity.type,
    img: (payload.identity.meta as OrgMeta).image || (payload.identity.meta as UserMeta).avatar || '',
    text: resp.text,
    type: 'sender',
    time: resp.created_at.toString(),
  };
}

function getImage(myId: string, msgId: string, participants: Participant[]): string {
  const msgIsMine = msgId === myId;
  const participant = participants.find((p) => p.identity_id === msgId);
  if (msgIsMine) {
    return participant.identity_meta.image || '';
  } else {
    return participant.identity_meta.avatar || '';
  }
}
function getIdentityType(msgId: string, participants: Participant[]): 'organizations' | 'users' {
  return participants.find((p) => p.id === msgId)?.type as 'organizations' | 'users';
}

export function getParticipantDetail(id: string, participants: Participant[] = []): Participant {
  return participants.find((p) => p.identity_id !== id) || ({} as Participant);
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
