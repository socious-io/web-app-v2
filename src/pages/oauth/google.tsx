import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { config } from 'src/config';
import { GoogleAuthRes, User, googleOauth, identities, profile } from 'src/core/api';
import { setAuthParams } from 'src/core/api/auth/auth.service';
import { nonPermanentStorage } from 'src/core/storage/non-permanent';
import store from 'src/store';
import { setIdentityList } from 'src/store/reducers/identity.reducer';

export const GoogleOauth2 = () => {
  const googleLoginURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${config.googleOauthClientId}&redirect_uri=${window.location.href}&response_type=code&scope=email profile&access_type=offline&prompt=consent`;

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const savedReferrer = localStorage.getItem('referrer');
  const referrerUser = savedReferrer ? JSON.parse(savedReferrer) : null;

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
    return '/jobs';
  }

  async function onLoginSucceed(loginResp: GoogleAuthRes) {
    await setAuthParams(loginResp, true);
    const path = await nonPermanentStorage.get('savedLocation');
    store.dispatch(setIdentityList(await identities()));
    const userProfile = await profile();
    const registered = (loginResp.registered ??= false);
    navigate(await determineUserLandingPath(userProfile, path, registered));
    return loginResp;
  }

  const code = searchParams.get('code');

  useEffect(() => {
    if (!code) {
      window.location.href = googleLoginURL;
      return;
    } else {
      googleOauth(code, referrerUser?.id)
        .then(res => onLoginSucceed(res))
        .catch(() => navigate('/sign-in'));
      localStorage.removeItem('referrer');
    }
  }, [code]);

  return <></>;
};
