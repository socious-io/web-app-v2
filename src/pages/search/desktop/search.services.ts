import { post } from 'src/core/http';
import { PayloadModel } from './search.types';
import { SearchReq } from 'src/core/types';

export async function search(payload: PayloadModel): Promise<SearchReq> {
  let body = {
    filter: { ...payload.filter },
    type: payload.type,
  };
  console.log('body', body);
  if (payload.q) {
    Object.assign(body, { q: payload.q });
  }
  console.log('payload', payload);
  return post(`search?page=${payload.page}&limit=50`, body).then(({ data }) => data);
}
