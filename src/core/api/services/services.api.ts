import { get, post, put, del } from '../http';
import { FilterReq, SuccessRes } from '../types';
import { ServicesRes, Service, ServiceReq } from './services.types';

export async function services(params: FilterReq): Promise<ServicesRes> {
  return (await get<ServicesRes>('services', { params })).data;
}

export async function service(id: string): Promise<Service> {
  return (await get<Service>(`services/${id}`)).data;
}

export async function createService(payload: ServiceReq): Promise<ServicesRes> {
  return (await post<ServicesRes>('services', payload)).data;
}

export async function updateService(id: string, payload: ServiceReq): Promise<ServicesRes> {
  return (await put<ServicesRes>(`services/${id}`, payload)).data;
}

export async function duplicateService(id: string, payload: ServiceReq): Promise<ServicesRes> {
  return (await post<ServicesRes>(`services/${id}`, payload)).data;
}

export async function deleteService(id: string): Promise<SuccessRes> {
  return (await del<SuccessRes>(`services/${id}`)).data;
}
