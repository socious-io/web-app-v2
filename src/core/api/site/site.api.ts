import { CurrentIdentity, Device, DeviceReq, SearchReq, Skill, SkillRes } from './site.types';
import { post, get } from '../http';
import { JobsRes } from '../jobs/jobs.types';
import { OrganizationsRes } from '../organizations/organizations.types';
import { PostsRes } from '../posts/posts.types';
import { PaginateReq, PaginateRes } from '../types';
import { UsersRes } from '../users/users.types';

export async function search(payload: SearchReq, params: PaginateReq) {
  const { data } = await post<PaginateRes>('search', payload, { params });
  switch (payload.type) {
    case 'organizations':
      return data as OrganizationsRes;
    case 'projects':
      return data as JobsRes;
    case 'posts':
      return data as PostsRes;
    case 'users':
      return data as UsersRes;
    default:
      return data;
  }
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

export async function skills(params: PaginateReq): Promise<SkillRes> {
  return (await get<SkillRes>('skills', { params })).data;
}
