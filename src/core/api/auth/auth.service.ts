import { createAsyncThunk } from '@reduxjs/toolkit';
import { config } from 'src/config';
import { nonPermanentStorage } from 'src/core/storage/non-permanent';
import store from 'src/store';
import { setIdentityList } from 'src/store/reducers/identity.reducer';

import { refresh } from './auth.api';
import { AuthRes } from './auth.types';
import { identities } from '../site/site.api';

export async function setAuthParams(auth: AuthRes) {
  await nonPermanentStorage.set({ key: 'access_token', value: auth.access_token }, Number(config.accessExpire));
  await nonPermanentStorage.set({ key: 'refresh_token', value: auth.refresh_token }, Number(config.refreshExpire));
  await nonPermanentStorage.set({ key: 'token_type', value: auth.token_type }, Number(config.refreshExpire));
}

export const currentIdentities = createAsyncThunk('identity/currentIdentities', identities);

export async function refreshToken() {
  const token = await nonPermanentStorage.get('refresh_token');
  if (!token) throw new Error('could not find refresh token');

  await setAuthParams(await refresh({ refresh_token: token }));
}
