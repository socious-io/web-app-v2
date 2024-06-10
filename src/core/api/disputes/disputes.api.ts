import { get, post } from 'src/core/api/http';

import { Dispute, DisputeReq, DisputesRes } from './disputes.types';
import { PaginateReq, SuccessRes } from '../types';

export async function disputes(params: PaginateReq): Promise<DisputesRes> {
  return (await get<DisputesRes>('disputes', { params })).data;
}

export async function dispute(id: string): Promise<Dispute> {
  return (await get<Dispute>(`disputes/${id}`)).data;
}

export async function issueDispute(payload: DisputeReq): Promise<Dispute> {
  return (await post<Dispute>('disputes', payload)).data;
}

export async function JoinContribution(): Promise<SuccessRes> {
  return (await post<SuccessRes>('contributions/optin', {})).data;
}

export async function LeaveContribution(): Promise<SuccessRes> {
  return (await post<SuccessRes>('contributions/leave', {})).data;
}

export async function withdrawDispute(id: string): Promise<SuccessRes> {
  return (await post<SuccessRes>(`disputes/${id}/withdraw`, {})).data;
}
