import { get } from 'src/core/api/http';
import { Referrer } from './referrers.types';

export async function getReferrer(id: string): Promise<Referrer | null> {
  return (await get<Referrer | null>(`referrers/getReferrer/${id}`)).data;
}
