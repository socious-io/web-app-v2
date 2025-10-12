import { addFiltersToSearch } from 'src/core/utils';

import { CurrentIdentity, Device, DeviceReq, EventsRes, SearchReq, SearchTypeMap, SkillsRes } from '../';
import { post, get } from '../http';
import { PaginateReq, PaginateRes, SuccessRes } from '../types';

export async function search<T extends keyof SearchTypeMap>(
  payload: SearchReq,
  params: PaginateReq,
): Promise<SearchTypeMap[T]> {
  return (await post<SearchTypeMap[T]>('search/v2', addFiltersToSearch(payload), { params })).data;
}

export async function searchHistory<T>(params: PaginateReq) {
  const { data } = await get<PaginateRes<T>>('search/history', { params });
  return data;
}

export async function identities(): Promise<CurrentIdentity[]> {
  return (await get<CurrentIdentity[]>('identities')).data;
}

export async function devices(): Promise<Device[]> {
  return (await get<Device[]>('devices')).data;
}

export async function newDevice(payload: DeviceReq): Promise<Device> {
  return (await post<Device>('devices', payload)).data;
}

export async function removeDevice(fcm: string): Promise<SuccessRes> {
  return (await post<SuccessRes>(`devices/remove/${fcm}`, {})).data;
}

export async function skills(params: PaginateReq): Promise<SkillsRes> {
  return (await get<SkillsRes>('skills', { params })).data;
}

export async function events(params: PaginateReq): Promise<EventsRes> {
  return (await get<EventsRes>('site/events', { params })).data;
}
