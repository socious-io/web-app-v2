import { config } from 'src/config';

import { get } from '../http';
import { FilterReq, PaginateReq } from '../types';
import { ServicesRes } from './services.types';

export async function services(params: PaginateReq, filters?: FilterReq): Promise<ServicesRes> {
  return (await get<ServicesRes>('projects', { params, baseURL: config.baseURLV3, withCredentials: false }, filters))
    .data;
}
