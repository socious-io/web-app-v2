import { get, post } from 'src/core/api/http';

import { Dispute, DisputeReq, DisputesRes } from './disputes.types';
import { PaginateReq } from '../types';

export async function disputes(params: PaginateReq): Promise<DisputesRes> {
  return (await get<DisputesRes>('disputes', { params })).data;
}

export async function issueDispute(payload: DisputeReq): Promise<Dispute> {
  return (await post<Dispute>('disputes', payload)).data;
}
