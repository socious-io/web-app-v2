import { get } from '../http';
import { FilterReq } from '../types';
import { ServicesRes } from './services.types';

export async function services(params: FilterReq): Promise<ServicesRes> {
  return (await get<ServicesRes>('services', { params })).data;
}
