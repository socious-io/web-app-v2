import { Capacitor } from '@capacitor/core';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AuthRes, LoginReq, User, devices, handleError, identities, login, newDevice, profile } from 'src/core/api';
import { setAuthParams } from 'src/core/api/auth/auth.service';
import {
  addNotificationReceivedListener,
  getDeliveredNotifications,
  getToken,
  requestPermissions,
} from 'src/core/pushNotification';
import { nonPermanentStorage } from 'src/core/storage/non-permanent';
import store from 'src/store';
import { setIdentityList } from 'src/store/reducers/identity.reducer';

import { schema } from './signin.form';

export const useSignin = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const [keepLoggedIn, setKeepLoggedIn] = useState(false);

  const checkOnboardingMandatoryFields = (profile: User) => {
    const mandatoryFields: (keyof User)[] = ['country', 'city', 'social_causes', 'skills'];

    return mandatoryFields.some((field) => {
      const value = profile[field];
      return value === null || value === '' || (Array.isArray(value) && value.length === 0);
    });
  };

  async function onLoginSucceed(loginResp: AuthRes) {
    await setAuthParams(loginResp, keepLoggedIn);
    const path = await nonPermanentStorage.get('savedLocation');
    store.dispatch(setIdentityList(await identities()));
    const userProfile = await profile();
    const userLandingPath = checkOnboardingMandatoryFields(userProfile) ? '/sign-up/user/welcome' : '/jobs';
    navigate(path ? path : userLandingPath);
    return loginResp;
  }
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
    const getDeviceTokens = await devices();
    const isTokenExisting = getDeviceTokens.some((device) => device.token === token);
    const determinePlatform = () => {
      const platform = Capacitor.getPlatform();
      return platform === 'android' ? 'ANDROID' : 'IOS';
    };

    if (!isTokenExisting) {
      newDevice({
        token,
        meta: {
          os: determinePlatform(),
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

  async function onLogin() {
    const formValues = getValues() as LoginReq;
    login(formValues)
      .then(onLoginSucceed)
      .then(registerPushNotifications)
      .catch(handleError({ title: 'Login Failed' }));
  }

  return { register, handleSubmit, errors, isValid, getValues, onLogin, keepLoggedIn, setKeepLoggedIn };
};
