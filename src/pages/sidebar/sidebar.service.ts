import { nonPermanentStorage } from 'src/core/storage/non-permanent';
import { post } from '../../core/http';

export async function logout() {
  //   Cookie.flush();
  removeFcmToken();
  return post(`/auth/logout`, {}).then(({ data }) => data);
}

export async function setIdentityHeader(accountId: string) {
  await nonPermanentStorage.set({ key: 'identity', value: accountId });
}

async function removeFcmToken() {
  const fcm = localStorage.getItem('fcm');
  if (fcm) await post(`devices/remove/${fcm}`, {}).then(({ data }) => data);
}
