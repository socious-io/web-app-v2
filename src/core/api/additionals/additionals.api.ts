import { AdditionalReq, AdditionalRes } from './additionals.types';
import { post } from '../http';
import { SuccessRes } from '../types';

export async function createAdditional(payload: AdditionalReq): Promise<AdditionalRes> {
  return (await post<AdditionalRes>('additionals', payload)).data;
}

export async function updateAdditional(id: string, payload: AdditionalReq): Promise<AdditionalRes> {
  return (await post<AdditionalRes>(`additionals/update/${id}`, payload)).data;
}

export async function removeAdditional(id: string): Promise<SuccessRes> {
  return (await post<SuccessRes>(`additionals/remove/${id}`, {})).data;
}
