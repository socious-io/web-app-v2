import { config } from 'src/config';

import { post, get } from '../http';
import { FilterReq, PaginateReq } from '../types';
import { ContractRes, CurrencyPayloadMap, DepositReq, NewContract, ContractReq } from './contracts.types';

const overwrittenConfigV3 = {
  baseURL: config.baseURLV3,
  withCredentials: false,
};

export async function contracts(params: PaginateReq, filters?: FilterReq): Promise<ContractRes> {
  return (await get<ContractRes>('contracts', { params, ...overwrittenConfigV3 }, filters)).data;
}

export async function createContract(payload: ContractReq): Promise<NewContract> {
  return (await post<NewContract>('contracts', payload, overwrittenConfigV3)).data;
}

export async function depositContract<K extends keyof CurrencyPayloadMap>(
  contractId: string,
  payload: DepositReq<K>,
): Promise<NewContract> {
  return (await post<NewContract>(`contracts/${contractId}/deposit`, payload, overwrittenConfigV3)).data;
}
