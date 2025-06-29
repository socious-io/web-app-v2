import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { config } from 'src/config';
import { getAuthUrlAdaptor, sociousOauthAdaptor } from 'src/core/adaptors';
import { AuthRes, profile, User } from 'src/core/api';
import { setAuthParams, switchAccount } from 'src/core/api/auth/auth.service';
import { nonPermanentStorage } from 'src/core/storage/non-permanent';

export const SociousID = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const identityId = searchParams.get('identity_id');

  const fetchAuthURL = async () => {
    const { error, data } = await getAuthUrlAdaptor(config.appBaseURL + 'oauth/socious');
    if (error) return;
    if (data) return data.url;
  };

  const onLoginSucceed = async (loginRes: AuthRes) => {
    const path = await nonPermanentStorage.get('savedLocation');
    await setAuthParams(loginRes, true);
    if (typeof identityId === 'string') switchAccount(identityId);
    if (path) navigate(path);
    else {
      const userProfile = await profile();
      // checking ids if less than 2 it means didn't registered for org and can be skip
      navigate(determineUserLandingPath(userProfile));
    }
  };

  const determineUserLandingPath = (userProfile: User) => {
    const isOnboardingIncomplete = checkOnboardingMandatoryFields(userProfile);
    if (isOnboardingIncomplete) {
      return '/sign-up/user/onboarding';
    }
    return '/';
  };

  const checkOnboardingMandatoryFields = (profile: User) => {
    const mandatoryFields: (keyof User)[] = ['country', 'city', 'social_causes', 'skills'];

    return mandatoryFields.some(field => {
      const value = profile[field];
      return value === null || value === '' || (Array.isArray(value) && value.length === 0);
    });
  };

  useEffect(() => {
    const handleSociousOauth = async (authCode: string) => {
      const { error, data } = await sociousOauthAdaptor(authCode);
      if (error) navigate('/intro');
      if (data) onLoginSucceed(data);
    };

    const redirectToAuthURL = async () => {
      const authURL = await fetchAuthURL();
      if (authURL) {
        window.location.href = authURL;
      }
    };

    if (!code) {
      redirectToAuthURL();
      return;
    }

    handleSociousOauth(code);
  }, [code]);

  return null;
};
