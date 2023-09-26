import { Capacitor } from '@capacitor/core';
import { useNavigate } from 'react-router-dom';
import { User, profile, identities, AuthRes, LoginReq, login, handleError } from 'src/core/api';
import { useForm } from 'src/core/form';
import { getFormValues } from 'src/core/form/customValidators/formValues';
import { nonPermanentStorage } from 'src/core/storage/non-permanent';
import { setIdentityList } from 'src/store/reducers/identity.reducer';
import store from 'src/store/store';

import { formModel } from './sign-in.form';
import { getFcmTokens, setAuthCookies, setFcmTokens } from './sign-in.services';
import {
  addNotificationReceivedListener,
  getDeliveredNotifications,
  getToken,
  requestPermissions,
} from '../../core/pushNotification';


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
  if (!token) {
    return;
  }
  const getDeviceTokens = await getFcmTokens();
  if (!getDeviceTokens.some((item) => item.token === token)) {
    setFcmTokens({
      token,
      meta: {
        os: Capacitor.getPlatform() === 'android' ? 'ANDROID' : 'IOS',
      },
    });
    localStorage.setItem('fcm', token);
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

  async function onLoginSucceed(loginResp: AuthRes) {
    await setAuthCookies(loginResp);
    const path = await nonPermanentStorage.get('savedLocation');
    store.dispatch(setIdentityList(await identities()));
    const userProfile = await profile();
    const userLandingPath = checkOnboardingMandatoryFields(userProfile) ? '/sign-up/user/welcome' : '/jobs';
    navigate(path ? path : userLandingPath);
    return loginResp;
  }

  const checkOnboardingMandatoryFields = (profile: User) => {
    const mandatoryFields: (keyof User)[] = ['country', 'city', 'social_causes', 'skills'];

    return mandatoryFields.some((field) => {
      const value = profile[field];
      return value === null || value === '' || (Array.isArray(value) && value.length === 0);
    });
  };

  async function onLogin() {
    const formValues = getFormValues(form) as LoginReq;

    login(formValues)
      .then(onLoginSucceed)
      .then(registerPushNotifications)
      .catch(handleError({ title: 'Login Failed' }));
  }

  return { onLogin, form, navigate };
};
