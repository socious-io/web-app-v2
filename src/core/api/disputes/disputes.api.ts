import { DisputesRes } from './dispute.types';
import { get } from '../http';

export async function disputes(): Promise<DisputesRes> {
  return (await get<DisputesRes>('disputes')).data;
}
