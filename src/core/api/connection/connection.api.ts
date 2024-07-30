import {
  ConnectRequest,
  ConnectionsRes,
  FollowingRes,
  ConnectionReq,
  ConnectionStatus,
  Connection,
  FollowRes,
} from './connection.types';
import { post, get } from '../http';
import { SuccessRes, PaginateReq, FilterReq } from '../types';

export async function connections(params: ConnectionReq): Promise<ConnectionsRes> {
  return (await get<ConnectionsRes>('connections', { params })).data;
}

export async function connectRequest(identityId: string, payload: ConnectRequest): Promise<Connection> {
  return (await post<Connection>(`connections/${identityId}`, payload)).data;
}

export async function connectRequestAccept(id: string): Promise<SuccessRes> {
  return (await post<SuccessRes>(`connections/${id}/accept`, {})).data;
}

export async function connectRequestReject(id: string): Promise<SuccessRes> {
  return (await post<SuccessRes>(`connections/${id}/block`, {})).data;
}

export async function block(identityId: string): Promise<Connection> {
  return (await post<Connection>(`connections/${identityId}/block/direct`, {})).data;
}
export async function getFollowers(params: PaginateReq): Promise<FollowingRes> {
  return (await get<FollowingRes>('follows/followers', { params })).data;
}
export async function getFollowings(params: PaginateReq): Promise<FollowingRes> {
  return (await get<FollowingRes>('follows/followings', { params })).data;
}
export async function filterFollowings(params: FilterReq): Promise<FollowingRes> {
  return (await get<FollowingRes>(`follows/followings`, { params })).data;
}
export async function follow(identityId: string): Promise<FollowRes> {
  return (await post<FollowRes>(`follows/${identityId}`, {})).data;
}

export async function unfollow(identityId: string): Promise<SuccessRes> {
  return (await post<SuccessRes>(`follows/${identityId}/unfollow`, {})).data;
}

export async function connectionStatus(id: string): Promise<ConnectionStatus> {
  return (await get<ConnectionStatus>(`connections/related/${id}`)).data;
}

export async function removeConnection(id: string): Promise<SuccessRes> {
  return (await post<SuccessRes>(`connections/${id}/disconnect`, {})).data;
}
