import { get, post } from 'src/core/api/http';

import { Dispute, DisputeReq, DisputesRes } from './disputes.types';
import { FilterReq, PaginateReq, SuccessRes } from '../types';

export async function disputes(params: FilterReq): Promise<DisputesRes> {
  return (await get<DisputesRes>('disputes', { params })).data;
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
