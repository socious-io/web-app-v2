/** @deprecated use core/api/endpoints instead */

import { get } from './http';
import { IdentityReq } from './types';

export async function getIdentities(): Promise<IdentityReq[]> {
  return get('/identities').then(({ data }) => data);
}
