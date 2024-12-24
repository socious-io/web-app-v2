import { Capacitor } from '@capacitor/core';
import { SignInWithApple, SignInWithAppleResponse, SignInWithAppleOptions } from '@capacitor-community/apple-sign-in';
import { useEffect } from 'react';
import { useState } from 'react';
import { useLoaderData, useNavigate, useSearchParams } from 'react-router-dom';
import { config } from 'src/config';
import { EVENTS_QUERIES } from 'src/constants/EVENTS_QUERIES';
import { AppleAuthResponse, EventsRes, GoogleAuthRes, User, appleOauth, identities, profile } from 'src/core/api';
import { setAuthParams } from 'src/core/api/auth/auth.service';
import { nonPermanentStorage } from 'src/core/storage/non-permanent';
import store from 'src/store';
import { setIdentityList } from 'src/store/reducers/identity.reducer';

const options: SignInWithAppleOptions = {
  clientId: 'io.socious.apple-login-dev',
  redirectURI: 'https://dev.socious.io/api/v2/auth/apple',
  scopes: 'email name',
  state: '12345',
  nonce: 'nonce',
};
export const AppleOauth2 = () => {
  const platform = Capacitor.getPlatform();
  const [appleResponse, setAppleResponse] = useState<AppleAuthResponse | null>(null);
  const appleLoginURL = `https://appleid.apple.com/auth/authorize?client_id=${config.appleOauthClientId}&redirect_uri=${config.baseURL}/auth/apple&response_type=code id_token&state=origin:web&scope=name email&response_mode=form_post&prompt=consent`;

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const events = (useLoaderData() as EventsRes) || null;

  const savedReferrer = localStorage.getItem('referrer');
  const referrerUser = savedReferrer ? JSON.parse(savedReferrer) : null;
  const eventName = searchParams.get('event_name') || '';
  const eventId = events?.items.find(event => event.title === EVENTS_QUERIES[eventName])?.id || '';

  const checkOnboardingMandatoryFields = (profile: User) => {
    const mandatoryFields: (keyof User)[] = ['country', 'city', 'social_causes', 'skills'];

    return mandatoryFields.some(field => {
      const value = profile[field];
      return value === null || value === '' || (Array.isArray(value) && value.length === 0);
    });
  };

  const hasUserParticularsMandatoryFields = (profile: User) => {
    const particularsFields: (keyof User)[] = ['first_name', 'last_name', 'username'];

    return particularsFields.some(field => {
      const value = profile[field];
      return value === null || value === '';
    });
  };

  const setEventsFilter = () => {
    const filter = { events: [eventId] };
    localStorage.setItem('filter', JSON.stringify(filter));
  };

  async function determineUserLandingPath(userProfile: User, path?: string | null | undefined, registered?: boolean) {
    const isParticularsIncomplete = hasUserParticularsMandatoryFields(userProfile);
    const isOnboardingIncomplete = checkOnboardingMandatoryFields(userProfile);

    if (registered || isParticularsIncomplete) {
      return '/sign-up/user/complete';
    }
    // Use provided path if both particulars and onboarding are complete
    if (path) {
      return path;
    }
    // Handle onboarding if particulars are complete
    if (isOnboardingIncomplete) {
      return '/sign-up/user/onboarding';
    }
    // Default to jobs page if no path and both processes are complete
    return eventName ? '/search?q=&type=users&page=1' : '/jobs';
  }

  async function onLoginSucceed(loginResp: GoogleAuthRes) {
    await setAuthParams(loginResp, true);
    const path = await nonPermanentStorage.get('savedLocation');
    store.dispatch(setIdentityList(await identities()));
    const userProfile = await profile();
    const registered = (loginResp.registered ??= false);
    eventName && setEventsFilter();
    navigate(await determineUserLandingPath(userProfile, path, registered));
    return loginResp;
  }

  const code = searchParams.get('code'),
    id_token = searchParams.get('id_token');

  const appleLogin = async options => {
    SignInWithApple.authorize(options)
      .then(result => {
        setAppleResponse(result.response);
      })
      .catch(error => {
        console.error('Error in apple login', error);
      });
  };

  const handleAppleOauth = async (
    authorizationCode: string,
    identityToken: string,
    referrerId: string | undefined,
    eventId: string | undefined,
    onLoginSucceed: (res: any) => void,
    navigate: (path: string) => void,
    eventName?: string,
    platform?: string,
  ) => {
    try {
      const res = await appleOauth(authorizationCode, identityToken, referrerId, eventId, platform);
      onLoginSucceed(res);
    } catch {
      navigate(`/sign-in?${eventName ? `event_name=${eventName}` : ''}`);
    } finally {
      localStorage.removeItem('referrer');
    }
  };

  // Seperated different implementaion for platforms in 2 useeffects for better readability
  useEffect(() => {
    if (platform === 'ios') {
      if (appleResponse) {
        handleAppleOauth(
          appleResponse.authorizationCode,
          appleResponse.identityToken,
          referrerUser?.id,
          eventId,
          onLoginSucceed,
          navigate,
          eventName,
          'ios',
        );
      } else {
        appleLogin(options);
      }
    }
  }, [appleResponse]);

  useEffect(() => {
    if (platform !== 'ios') {
      if (!code || !id_token) {
        window.location.href = appleLoginURL;
        return;
      }
      handleAppleOauth(code, id_token, referrerUser?.id, eventId, onLoginSucceed, navigate, eventName, 'web');
    }
  }, [code]);

  return <></>;
};
