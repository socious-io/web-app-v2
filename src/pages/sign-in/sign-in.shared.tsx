import { useNavigate } from '@tanstack/react-location';
import { formModel } from './sign-in.form';
import { setAuthCookies } from './sign-in.services';
import { LoginResp } from 'src/core/types';
import { getIdentities } from 'src/core/api';
import { setIdentityList } from 'src/store/reducers/identity.reducer';
import store from 'src/store/store';
import { endpoint } from 'src/core/endpoints';
import { handleError } from 'src/core/http';
import { getFormValues } from 'src/core/form/customValidators/formValues';
import { LoginPayload } from './sign-in.types';
import { useForm } from 'src/core/form';
import {
  addNotificationReceivedListener,
  getDeliveredNotifications,
  getToken,
  requestPermissions,
} from '../../core/pushNotification';
import { Capacitor } from '@capacitor/core';
import { nonPermanentStorage } from 'src/core/storage/non-permanent';

const addListeners = () => {
  addNotificationReceivedListener().then((n) => console.log('addNotificationReceivedListener: ', n));
  getDeliveredNotifications().then((r) => console.log('getDeliveredNotifications', r));
};

const getFCMToken = async (response: Awaited<ReturnType<typeof requestPermissions>>): Promise<string> => {
  if (response !== 'granted') {
    console.log('User did not grant permission to use push notification');
    throw Error;
  }

  return getToken().catch((e: Error) => {
    console.log('error accrued during retrieving token', e);
    return '';
  });
};

const saveToken = async (token: string) => {
  console.log('FCMToken: ', token);
  if (!token) {
    return;
  }
};

function registerPushNotifications() {
  if (Capacitor.isNativePlatform()) {
    requestPermissions().then(getFCMToken).then(saveToken).then(addListeners);
  }
}

export const useSignInShared = () => {
  const navigate = useNavigate();
  const form = useForm(formModel);

  async function onLoginSucceed(loginResp: LoginResp) {
    await setAuthCookies(loginResp);
    const resp = await getIdentities();
    const path = await nonPermanentStorage.get('savedLocation');
    store.dispatch(setIdentityList(resp));
    navigate({ to: path ? path : '/jobs', replace: true });
    return loginResp;
  }

  async function onLogin() {
    const formValues = getFormValues(form) as LoginPayload;
    endpoint.post.auth
      .login(formValues)
      .then(onLoginSucceed)
      .then(registerPushNotifications)
      .catch(handleError({ title: 'Login Failed' }));
  }

  return { onLogin, form, navigate };
};
