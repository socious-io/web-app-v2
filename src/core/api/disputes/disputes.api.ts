import { get, post } from 'src/core/api/http';

import { Dispute, DisputeReq, DisputesRes, Invitation, InvitationsRes, RespondDisputeReq } from './disputes.types';
import { FilterReq, SuccessRes } from '../types';

export async function disputes(params: FilterReq): Promise<DisputesRes> {
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
export async function vote(id: string, vote_side: 'CLAIMANT' | 'RESPONDENT'): Promise<Dispute> {
  return (await post<Dispute>(`disputes/${id}/vote?vote_side=${vote_side}`, {})).data;
}

export async function respondDispute(payload: RespondDisputeReq, disputedId: string): Promise<Dispute> {
  return (await post<Dispute>(`disputes/${disputedId}/response`, payload)).data;
}

export async function invitations(params: FilterReq): Promise<InvitationsRes> {
  return (await get<InvitationsRes>('disputes/invitations', { params })).data;
}

export async function acceptInvitation(invitationId: string): Promise<Invitation> {
  return (await post<Invitation>(`disputes/invitations/${invitationId}/accept`, {})).data;
}

export async function declineInvitation(invitationId: string): Promise<Invitation> {
  return (await post<Invitation>(`disputes/invitations/${invitationId}/decline`, {})).data;
}
