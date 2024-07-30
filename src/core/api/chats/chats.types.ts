import { UserType } from 'src/core/types';

import { Identity } from '../site/site.types';
import { ChatMemberType, PaginateRes } from '../types';

export interface MessageReq {
  text: string;
  media?: string;
}

export interface ChatReq {
  name: string;
  description?: string;
  type: 'CHAT';
  participants: string[];
}
export interface ChatsRes extends PaginateRes {
  items: Chat[];
}

export interface MessagesRes extends PaginateRes {
  items: Message[];
}
export interface ChatCountRes {
  count: string;
}
export interface Chat {
  id: string;
  name: string;
  description?: string;
  type: string;
  created_by: string;
  updated_at: Date;
  created_at: Date;
  deleted_at?: Date;
  participants: Participant[];
  participation: Participation;
  last_message: Message;
  message_count: string;
  unread_count: string;
}

export interface Message {
  id: string;
  description?: string;
  reply_id?: string;
  chat_id: string;
  identity_id: string;
  text: string;
  replied: boolean;
  media?: string;
  media_url?: string;

  updated_at: Date;
  created_at: Date;
  deleted_at?: Date;
}

export interface Participation {
  type: string;
  muted_until: null;
  last_read_at: Date;
  last_read_id: string;
  all_read: boolean;
}

export interface Participant extends Omit<Identity, 'type' | 'verification_status'> {
  all_read: boolean;
  last_read_id?: string;
  last_read_at?: Date;
  identity_type?: UserType;
  type: ChatMemberType;
}

export interface ParticipantRes extends PaginateRes {
  items: Participant[];
}

export interface chatIdRes {
  id: string[];
}
