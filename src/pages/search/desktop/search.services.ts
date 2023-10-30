import { search as searchReq } from 'src/core/api/site/site.api';
import { SearchReq } from 'src/core/types';

import { PayloadModel } from './search.types';

export async function search(payload: PayloadModel): Promise<SearchReq> {
  const body = {
    filter: payload.filter,
    type: payload.type,
  };
  if (payload.q.trim()) {
    Object.assign(body, { q: payload.q });
  }
  return searchReq(body, { limit: 50, page: payload.page });
}
