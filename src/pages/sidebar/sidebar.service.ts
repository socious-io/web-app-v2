import { logout as logoutApi, removeDevice } from 'src/core/api';
import { nonPermanentStorage } from 'src/core/storage/non-permanent';
import store from 'src/store';
import { removeIdentityList } from 'src/store/reducers/identity.reducer';

// import { post } from '../../core/http';

export async function logout() {
  //   Cookie.flush();
  store.dispatch(removeIdentityList());
  removeFcmToken();
  return logoutApi();
}

export async function setIdentityHeader(accountId: string) {
  await nonPermanentStorage.set({ key: 'identity', value: accountId });
}

async function removeFcmToken() {
  const fcm = localStorage.getItem('fcm');
  if (fcm) await removeDevice(fcm);
}
