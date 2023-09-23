import { post, get } from '../http';
import { SuccessRes, PaginateReq } from '../types';
import { ConnectRequest, ConnectionsRes } from './connection.type';

export async function connections(params: PaginateReq): Promise<ConnectionsRes> {
  return (await get<ConnectionsRes>('connections', { params })).data;
}

export async function connectRequest(identityId: string, payload: ConnectRequest): Promise<SuccessRes> {
  return (await post<SuccessRes>(`connections/${identityId}`, payload)).data;
}

export async function connectRequestAccept(id: string): Promise<SuccessRes> {
  return (await post<SuccessRes>(`connections/${id}/accept`, {})).data;
}

export async function connectRequestReject(id: string): Promise<SuccessRes> {
  return (await post<SuccessRes>(`connections/${id}/block`, {})).data;
}

export async function block(identityId: string): Promise<SuccessRes> {
  return (await post<SuccessRes>(`connections/${identityId}/block/direct`, {})).data;
}
