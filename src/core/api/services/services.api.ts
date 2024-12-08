import { config } from 'src/config';

import { get, post, put, del } from '../http';
import { FilterReq, SuccessRes } from '../types';
import { ServicesRes, Service, ServiceReq } from './services.types';

const baseURL = config.baseURLV3;

export async function services(params: FilterReq): Promise<ServicesRes> {
  return (await get<ServicesRes>('services', { params, baseURL })).data;
}

export async function service(id: string): Promise<Service> {
  return (await get<Service>(`services/${id}`, { baseURL })).data;
}

export async function createService(payload: ServiceReq): Promise<ServicesRes> {
  return (await post<ServicesRes>('services', payload, { baseURL })).data;
}

export async function updateService(id: string, payload: ServiceReq): Promise<ServicesRes> {
  return (await put<ServicesRes>(`services/${id}`, payload, { baseURL })).data;
}

export async function duplicateService(id: string, payload: ServiceReq): Promise<ServicesRes> {
  return (await post<ServicesRes>(`services/${id}`, payload, { baseURL })).data;
}

export async function deleteService(id: string): Promise<SuccessRes> {
  return (await del<SuccessRes>(`services/${id}`, { baseURL })).data;
}
