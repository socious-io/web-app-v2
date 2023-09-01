import { nonPermanentStorage } from 'src/core/storage/non-permanent';
import { post, get } from '../../core/http';
import { CreateFcmPayload, FcmListResp, LoginResp } from '../../core/types';
import { LoginPayload } from './sign-in.types';
import { config } from 'src/config';
import { dialog } from 'src/core/dialog/dialog';

export async function login(payload: LoginPayload): Promise<LoginResp> {
  return post('auth/web/login', payload).then(({ data }) => data);
}

export async function setAuthCookies(loginResp: LoginResp) {
  await nonPermanentStorage.set({ key: 'access_token', value: loginResp.access_token }, Number(config.accessExpire));
  await nonPermanentStorage.set({ key: 'refresh_token', value: loginResp.refresh_token }, Number(config.refreshExpire));
  await nonPermanentStorage.set({ key: 'token_type', value: loginResp.token_type }, Number(config.refreshExpire));
}

export async function getFcmTokens(): Promise<FcmListResp> {
  return get('/devices').then(({ data }) => data);
}

export async function setFcmTokens(payload: CreateFcmPayload): Promise<FcmListResp> {
  return post('/devices', payload).then(({ data }) => data);
}
