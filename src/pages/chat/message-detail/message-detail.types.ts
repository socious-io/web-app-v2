import { ChatsRes, FollowingRes, Identity, MessagesRes, ParticipantRes } from 'src/core/api';

export type MessageLoader = {
  messages: MessagesRes;
  participants: ParticipantRes;
  summery: ChatsRes;
  followings: FollowingRes;
};

export type OnPostMessageParams = {
  id: string;
  identity: Identity;
  text: string;
};
