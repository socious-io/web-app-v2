import { Capacitor } from '@capacitor/core';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AuthRes, User, devices, identities, login, newDevice, profile } from 'src/core/api';
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
import { useCaptcha } from 'src/Nowruz/pages/captcha';
import * as yup from 'yup';

const schema = yup
  .object()
  .shape({
    email: yup
      .string()
      .trim()
      .email('Enter a correct email')
      .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Enter a correct email')
      .required('Enter a correct email'),
    password: yup.string().required('Enter a correct password'),
  })
  .required();

export const useSignInForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    setError,
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const { tried, required } = useCaptcha();

  useEffect(() => {
    if (required) navigate('/captcha');
  }, [required]);

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
    const ids = await identities();
    store.dispatch(setIdentityList(ids));
    const userProfile = await profile();
    // checking ids if less than 2 it means didn't registered for org and can be skip
    const userLandingPath =
      checkOnboardingMandatoryFields(userProfile) && ids.length < 2 ? '/sign-up/user/onboarding' : '/jobs';
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
    // if (Capacitor.isNativePlatform()) {
    requestPermissions().then(getFCMToken).then(saveToken).then(addListeners);
    // }
  }

  async function onLogin() {
    const formValues = { email: getValues().email.trim(), password: getValues().password };
    tried();
    login(formValues)
      .then(onLoginSucceed)
      .then(registerPushNotifications)
      .catch((e) => {
        if (e?.response?.data.error) {
          setError('password', {
            type: 'manual',
            message: 'Username or password not matched',
          });
        }
      });
  }

  const handleChange = () => {
    setKeepLoggedIn(!keepLoggedIn);
  };
  return {
    register,
    handleSubmit,
    errors,
    isValid,
    getValues,
    onLogin,
    keepLoggedIn,
    setKeepLoggedIn,
    handleChange,
    registerPushNotifications,
    tried,
  };
};
