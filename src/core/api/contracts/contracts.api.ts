import { config } from 'src/config';

import { post, get, patch } from '../http';
import { FilterReq, PaginateReq } from '../types';
import {
  ContractRes,
  CurrencyPayloadMap,
  DepositReq,
  NewContract,
  ContractReq,
  SubmitReq,
  FeedbackReq,
} from './contracts.types';

const overwrittenConfigV3 = {
  baseURL: config.baseURLV3,
  withCredentials: false,
};

export async function contracts(params: PaginateReq, filters?: FilterReq): Promise<ContractRes> {
  return (await get<ContractRes>('contracts', { params, ...overwrittenConfigV3 }, filters)).data;
}

export async function contract(id: string): Promise<NewContract> {
  return (await get<NewContract>(`contracts/${id}`, overwrittenConfigV3)).data;
}

export async function createContract(payload: ContractReq): Promise<NewContract> {
  return (await post<NewContract>('contracts', payload, overwrittenConfigV3)).data;
}

export async function depositContract<K extends keyof CurrencyPayloadMap>(
  id: string,
  payload: DepositReq<K>,
): Promise<NewContract> {
  return (await post<NewContract>(`contracts/${id}/deposit`, payload, overwrittenConfigV3)).data;
}

export async function submitRequirements(id: string, payload: SubmitReq): Promise<NewContract> {
  return (await patch<NewContract>(`contracts/${id}/requirements`, payload, overwrittenConfigV3)).data;
}

export async function signContract(id: string): Promise<NewContract> {
  return (await post<NewContract>(`contracts/${id}/sign`, {}, overwrittenConfigV3)).data;
}

export async function cancelContract(id: string): Promise<NewContract> {
  return (await post<NewContract>(`contracts/${id}/cancel`, {}, overwrittenConfigV3)).data;
}

export async function applyContract(id: string): Promise<NewContract> {
  return (await post<NewContract>(`contracts/${id}/apply`, {}, overwrittenConfigV3)).data;
}

export async function completeContract(id: string): Promise<NewContract> {
  return (await post<NewContract>(`contracts/${id}/complete`, {}, overwrittenConfigV3)).data;
}

export async function feedbackContract(id: string, payload: FeedbackReq): Promise<NewContract> {
  return (await post<NewContract>(`contracts/${id}/feedback`, payload, overwrittenConfigV3)).data;
}
