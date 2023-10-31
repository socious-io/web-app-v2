import { config } from 'src/config';
import { nonPermanentStorage } from 'src/core/storage/non-permanent';

import { refresh } from './auth.api';
import { AuthRes } from './auth.types';

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

export async function refreshToken() {
  const token = await nonPermanentStorage.get('refresh_token');
  if (!token) throw new Error('could not find refresh token');

  await setAuthParams(await refresh({ refresh_token: token }));
}
