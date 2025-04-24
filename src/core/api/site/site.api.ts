import { addFiltersToSearch } from 'src/core/utils';

import { CurrentIdentity, Device, DeviceReq, EventsRes, SearchReq, Skill, SkillRes } from './site.types';
import { post, get } from '../http';
import { ApplicantsRes, JobsRes } from '../jobs/jobs.types';
import { OrganizationsRes } from '../organizations/organizations.types';
import { PostsRes } from '../posts/posts.types';
import { PaginateReq, PaginateRes, SuccessRes } from '../types';
import { UsersRes } from '../users/users.types';

export async function search(payload: SearchReq, params: PaginateReq) {
  const { data } = await post<PaginateRes>('search/v2', addFiltersToSearch(payload), { params });
  switch (payload.type) {
    case 'organizations':
      return data as OrganizationsRes;
    case 'projects':
      return data as JobsRes;
    case 'posts':
      return data as PostsRes;
    case 'users':
      return data as UsersRes;
    case 'applicants':
      return data as ApplicantsRes;
    default:
      return data;
  }
}
export async function searchHistory(params: PaginateReq) {
  const { data } = await get<PaginateRes>('search/history', { params });
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

export async function skills(params: PaginateReq): Promise<SkillRes> {
  return (await get<SkillRes>('skills', { params })).data;
}

export async function events(params: PaginateReq): Promise<EventsRes> {
  return (await get<EventsRes>('site/events', { params })).data;
}
