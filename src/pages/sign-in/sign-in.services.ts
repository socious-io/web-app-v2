import { nonPermanentStorage } from 'src/core/storage/non-permanent';
import { post } from '../../core/http';
import { LoginResp } from '../../core/types';
import { LoginPayload } from './sign-in.types';
import { config } from 'src/config';

export async function login(payload: LoginPayload): Promise<LoginResp> {
  return post('auth/web/login', payload).then(({ data }) => data);
}

export async function setAuthCookies(loginResp: LoginResp) {
  await nonPermanentStorage.set({ key: 'access_token', value: loginResp.access_token }, Number(config.accessExpire));
  await nonPermanentStorage.set({ key: 'refresh_token', value: loginResp.refresh_token }, Number(config.refreshExpire));
  await nonPermanentStorage.set({ key: 'token_type', value: loginResp.token_type }, Number(config.refreshExpire));
}
