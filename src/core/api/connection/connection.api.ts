import { ConnectRequest, ConnectionsRes, FollowingRes, ConnectionReq } from './connection.types';
import { post, get } from '../http';
import { SuccessRes, PaginateReq, FilterReq } from '../types';

export async function connections(params: ConnectionReq): Promise<ConnectionsRes> {
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
export async function getFollowings(params: PaginateReq): Promise<FollowingRes> {
  return (await get<FollowingRes>('follows/followings', { params })).data;
}
export async function filterFollowings(params: FilterReq): Promise<FollowingRes> {
  return (await get<FollowingRes>(`follows/followings?page=${params?.page || ''}&name=${params.filter}`)).data;
}
export async function follow(identityId: string): Promise<SuccessRes> {
  return (await post<SuccessRes>(`follows/${identityId}`, {})).data;
}

export async function unfollow(identityId: string): Promise<SuccessRes> {
  return (await post<SuccessRes>(`follows/${identityId}/unfollow`, {})).data;
}
