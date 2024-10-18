import { Capacitor } from '@capacitor/core';
import { yupResolver } from '@hookform/resolvers/yup';
import i18next from 'i18next';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
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
import { useCaptcha } from 'src/pages/captcha';
import store from 'src/store';
import { setIdentityList } from 'src/store/reducers/identity.reducer';
import * as yup from 'yup';

const schema = yup
  .object()
  .shape({
    email: yup
      .string()
      .trim()
      .email(i18next.t('login-email-error'))
      .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i, i18next.t('login-email-error'))
      .required(i18next.t('login-email-error')),
    password: yup.string().required(i18next.t('login-password-error')),
  })
  .required();

export const useSignInForm = (event_id: string) => {
  const navigate = useNavigate();
  const { t: translate } = useTranslation();

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

    return mandatoryFields.some(field => {
      const value = profile[field];
      return value === null || value === '' || (Array.isArray(value) && value.length === 0);
    });
  };

  const setEventsFilter = () => {
    const filter = { events: [event_id] };
    localStorage.setItem('filter', JSON.stringify(filter));
  };

  const determineUserLandingPath = (userProfile: User, path?: string | null) => {
    const hasOnboardingMandatoryFields = checkOnboardingMandatoryFields(userProfile);

    if (path) {
      return path;
    }

    if (hasOnboardingMandatoryFields) {
      return '/sign-up/user/onboarding';
    }

    return event_id ? '/search?q=&type=users&page=1' : '/dashboard/user';
  };

  async function onLoginSucceed(loginResp: AuthRes) {
    await setAuthParams(loginResp, keepLoggedIn);
    const path = await nonPermanentStorage.get('savedLocation');
    const ids = await identities();
    store.dispatch(setIdentityList(ids));
    const userProfile = await profile();
    // checking ids if less than 2 it means didn't registered for org and can be skip
    event_id && setEventsFilter();
    navigate(determineUserLandingPath(userProfile, path));
    const userLandingPath = checkOnboardingMandatoryFields(userProfile)
      ? '/sign-up/user/onboarding'
      : '/dashboard/user';
    navigate(path ? path : userLandingPath);
    return loginResp;
  }
  const addListeners = () => {
    addNotificationReceivedListener().then(n => console.log('addNotificationReceivedListener: ', n));
    getDeliveredNotifications().then(r => console.log('getDeliveredNotifications', r));
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
    const isTokenExisting = getDeviceTokens.some(device => device.token === token);
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
    login(formValues, { event_id })
      .then(onLoginSucceed)
      .then(registerPushNotifications)
      .catch(e => {
        if (e?.response?.data.error) {
          setError('password', {
            type: 'manual',
            message: translate('login-error-not-matched'),
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
    translate,
  };
};
