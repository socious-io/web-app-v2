import { config } from 'src/config';

import { get, post, patch, del } from '../http';
import { FilterReq, PaginateReq, SuccessRes } from '../types';
import { ServicesRes, Service, ServiceReq } from './services.types';

const overwrittenConfigV3 = {
  baseURL: config.baseURLV3,
  withCredentials: false,
};

export async function services(params: PaginateReq, filters?: FilterReq): Promise<ServicesRes> {
  return (await get<ServicesRes>('projects', { params, ...overwrittenConfigV3 }, filters)).data;
}

export async function service(id: string): Promise<Service> {
  return (await get<Service>(`projects/${id}`, overwrittenConfigV3)).data;
}

export async function createService(payload: ServiceReq): Promise<ServicesRes> {
  return (await post<ServicesRes>('projects', payload, overwrittenConfigV3)).data;
}

export async function updateService(id: string, payload: ServiceReq): Promise<ServicesRes> {
  return (await patch<ServicesRes>(`projects/${id}`, payload, overwrittenConfigV3)).data;
}

export async function deleteService(id: string): Promise<SuccessRes> {
  return (await del<SuccessRes>(`projects/${id}`, overwrittenConfigV3)).data;
}
