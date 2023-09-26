import { formModel } from './sign-in.form';
import { getFcmTokens, getUsersTokens, setAuthCookies, setFcmTokens } from './sign-in.services';
import { LoginResp } from 'src/core/types';
import { getIdentities } from 'src/core/api';
import { setIdentityList } from 'src/store/reducers/identity.reducer';
import store from 'src/store/store';
import { endpoint } from 'src/core/endpoints';
import { get, handleError, post } from 'src/core/http';
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
import { getProfileRequest } from '../sign-up/sign-up-user-onboarding/sign-up-user-onboarding.service';

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
  const navigate = {};
  const form = useForm(formModel);

  async function onLoginSucceed(loginResp: LoginResp) {
    await setAuthCookies(loginResp);
    const resp = await getIdentities();
    const path = await nonPermanentStorage.get('savedLocation');
    store.dispatch(setIdentityList(resp));
    const selectedIdentity = resp.find((identity) => identity.primary);
    const userProfile = await getProfileRequest(selectedIdentity?.id);
    const userLandingPath = checkOnboardingMandatoryFields(userProfile) ? '/sign-up/user/welcome' : '/jobs';
    navigate({ to: path ? path : userLandingPath, replace: true });
    return loginResp;
  }
  const checkOnboardingMandatoryFields = (profile) => {
    const mandatoryFields = ['country', 'city', 'social_causes', 'skills'];
    let shouldDisplayOnboarding = false;
    mandatoryFields.forEach((field) => {
      if (
        profile[field] === null ||
        profile[field] === '' ||
        (Array.isArray(profile[field]) && profile[field].length === 0)
      ) {
        shouldDisplayOnboarding = true;
      }
    });
    return shouldDisplayOnboarding;
  };
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
