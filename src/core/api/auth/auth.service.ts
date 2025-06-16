import { config } from 'src/config';
import { getIdentitiesAdaptor } from 'src/core/adaptors';
import { nonPermanentStorage } from 'src/core/storage/non-permanent';
import store from 'src/store';
import { setIdentityList } from 'src/store/reducers/identity.reducer';

import { refresh } from './auth.api';
import { AuthRes } from './auth.types';
const dispatch = store.dispatch;

export async function setAuthParams(auth: AuthRes, keepLoggedIn?: boolean) {
  await nonPermanentStorage.set(
    { key: 'access_token', value: auth.access_token },
    keepLoggedIn ? Number(config.accessExpire) : undefined,
  );
  await nonPermanentStorage.set(
    { key: 'refresh_token', value: auth.refresh_token },
    keepLoggedIn ? Number(config.refreshExpire) : undefined,
  );
  await nonPermanentStorage.set(
    { key: 'token_type', value: auth.token_type },
    keepLoggedIn ? Number(config.refreshExpire) : undefined,
  );
}
export const switchAccount = async (accountId: string) => {
  await nonPermanentStorage.set({ key: 'identity', value: accountId });
  const { error, data } = await getIdentitiesAdaptor();
  if (error) return;
  if (data) dispatch(setIdentityList(data));
};

export async function refreshToken() {
  const token = await nonPermanentStorage.get('refresh_token');
  if (!token) throw new Error('could not find refresh token');

  await setAuthParams(await refresh({ refresh_token: token }));
}
