import { config } from 'src/config';

import { post } from '../http';
import { CurrencyPayloadMap, DepositReq, NewContract } from './contracts.types';

const overwrittenConfigV3 = {
  baseURL: config.baseURLV3,
  withCredentials: false,
};

export async function depositContract<K extends keyof CurrencyPayloadMap>(
  contractId: string,
  payload: DepositReq<K>,
): Promise<NewContract> {
  return (await post<NewContract>(`contracts/${contractId}/deposit`, { payload, ...overwrittenConfigV3 })).data;
}
