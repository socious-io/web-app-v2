import {
  Chat,
  ChatCountRes,
  chatIdRes,
  ChatReq,
  ChatsRes,
  Message,
  MessageReq,
  MessagesRes,
  ParticipantRes,
} from './chats.types';
import { post, get } from '../http';
import { SuccessRes, PaginateReq, FilterReq } from '../types';

export async function chats(params: PaginateReq): Promise<ChatsRes> {
  return (await get<ChatsRes>('chats/summary', { params })).data;
}

export async function createChat(payload: ChatReq): Promise<Chat> {
  return (await post<Chat>('chats', payload)).data;
}

export async function chatMessages(id: string, params: PaginateReq): Promise<MessagesRes> {
  return (await get<MessagesRes>(`chats/${id}/messages`, { params })).data;
}

export async function createChatMessage(id: string, payload: MessageReq): Promise<Message> {
  return (await post<Message>(`chats/${id}/messages`, payload)).data;
}

export async function updateChatMessage(chatId: string, msgId: string, payload: MessageReq): Promise<Message> {
  return (await post<Message>(`chats/remove/${chatId}/messages/${msgId}`, payload)).data;
}

export async function removeChatMessage(chatId: string, msgId: string): Promise<SuccessRes> {
  return (await post<SuccessRes>(`chats/remove/${chatId}/messages/${msgId}`, {})).data;
}

export async function readChatMessage(chatId: string, msgId: string): Promise<SuccessRes> {
  return (await post<SuccessRes>(`chats/update/${chatId}/messages/${msgId}/read`, {})).data;
}
export async function getChatParticipantsById(id: string): Promise<ParticipantRes> {
  return (await get<ParticipantRes>(`chats/${id}/participants`)).data;
}

export async function findChat(payload: { participants: string[] }): Promise<ChatsRes> {
  return (await post<ChatsRes>('chats/find', payload)).data;
}

export async function filterChats(params: FilterReq): Promise<ChatsRes> {
  return (await get<ChatsRes>('chats/summary', { params })).data;
}

export async function unreadCounts(): Promise<ChatCountRes> {
  return (await get<ChatCountRes>('/chats/unreads/counts')).data;
}
