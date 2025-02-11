/* eslint-disable prettier/prettier */
import { Capacitor } from '@capacitor/core';
// import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { SocialLogin, GoogleLoginResponseOnline } from '@capgo/capacitor-social-login';
import { useEffect } from 'react';
import { useLoaderData, useNavigate, useSearchParams } from 'react-router-dom';
import { config } from 'src/config';
import { EVENTS_QUERIES } from 'src/constants/EVENTS_QUERIES';
import { EventsRes, GoogleAuthRes, User, googleOauth, identities, profile } from 'src/core/api';
import { setAuthParams } from 'src/core/api/auth/auth.service';
import { DeepLinks } from 'src/core/deepLinks';
import { nonPermanentStorage } from 'src/core/storage/non-permanent';
import store from 'src/store';
import { setIdentityList } from 'src/store/reducers/identity.reducer';

SocialLogin.initialize({
  google: {
    iOSClientId: config.googleOauthClientIdIos,
  },
});
export const GoogleOauth2 = () => {
  //in ios instead of https there is capacitor in the link !!
  const replaceCapacitor = str => str.replace(/capacitor/g, 'https');
  const googleCallbackUrl = replaceCapacitor(window.location.href);
  const googleLoginURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${config.googleOauthClientId}&redirect_uri=${googleCallbackUrl}&response_type=code&scope=email profile&access_type=offline&prompt=consent`;
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

  const code = searchParams.get('code');

  useEffect(() => {
    const handleGoogleOauth = (authCodeOrToken, platform) => {
      googleOauth(authCodeOrToken, referrerUser?.id, eventId, platform)
        .then(res => onLoginSucceed(res))
        .catch(() => navigate(`/sign-in?${eventName && `event_name=${eventName}`}`));
      localStorage.removeItem('referrer');
    };

    if (Capacitor.getPlatform() === 'ios') {
      SocialLogin.login({
        provider: 'google',
        options: {
          scopes: ['email', 'profile'],
        },
      }).then(googleUser => {
        const googleRes = googleUser.result as GoogleLoginResponseOnline;
        handleGoogleOauth(googleRes.idToken, 'ios');
      });
    } else {
      if (!code) {
        window.location.href = googleLoginURL;
        return;
      } else {
        handleGoogleOauth(code, 'other');
      }
    }
  }, [code]);

  // TODO: Implement using third party.
  // Anywhere else Deeplink is not called after user returned from google oauth.
  return (
    <>
      <DeepLinks />
    </>
  );
};
