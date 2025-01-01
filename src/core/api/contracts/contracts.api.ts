import { config } from 'src/config';

import { post } from '../http';
import { ContractReq, CurrencyPayloadMap, DepositReq, NewContract, SubmitReq } from './contracts.types';

const overwrittenConfigV3 = {
  baseURL: config.baseURLV3,
  withCredentials: false,
};

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
  return (await post<NewContract>(`contracts/${id}/requirements`, payload, overwrittenConfigV3)).data;
}
