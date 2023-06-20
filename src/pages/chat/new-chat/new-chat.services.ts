import { post } from 'src/core/http';

export async function postFind(payload: { participants: string[] }): Promise<{ items: { id: string }[] }> {
  return post('chats/find', payload).then(({ data }) => data);
}

export async function createChats(payload: {
  name: string;
  description?: string;
  type: string;
  participants: string[];
}): Promise<{ id: string }> {
  return post('chats', payload).then(({ data }) => data);
}
