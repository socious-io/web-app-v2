import { config } from 'src/config';
import { AuthRes, Device, DeviceReq, devices, login as loginApi, newDevice } from 'src/core/api';
import { nonPermanentStorage } from 'src/core/storage/non-permanent';

import { LoginPayload } from './sign-in.types';

export async function login(payload: LoginPayload): Promise<AuthRes> {
  return loginApi(payload);
}

export async function setAuthCookies(loginResp: AuthRes) {
  await nonPermanentStorage.set({ key: 'access_token', value: loginResp.access_token }, Number(config.accessExpire));
  await nonPermanentStorage.set({ key: 'refresh_token', value: loginResp.refresh_token }, Number(config.refreshExpire));
  await nonPermanentStorage.set({ key: 'token_type', value: loginResp.token_type }, Number(config.refreshExpire));
}

export async function getFcmTokens(): Promise<Device[]> {
  return devices();
}

export async function setFcmTokens(payload: DeviceReq): Promise<Device> {
  return newDevice(payload);
}
