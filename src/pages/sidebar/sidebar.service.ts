import { nonPermanentStorage } from 'src/core/storage/non-permanent';
import { Cookie } from '../../core/storage';
import { get, post } from '../../core/http';

export async function logout() {
  //   Cookie.flush();
  return post(`/auth/logout`, {}).then(({ data }) => data);
}

export async function setIdentityHeader(accountId: string) {
  await nonPermanentStorage.set({ key: 'identity', value: accountId });
}
