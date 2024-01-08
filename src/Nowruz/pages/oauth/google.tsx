import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { config } from 'src/config';
import { AuthRes, User, googleOauth, identities, profile } from 'src/core/api';
import { setAuthParams } from 'src/core/api/auth/auth.service';
import { nonPermanentStorage } from 'src/core/storage/non-permanent';
import store from 'src/store';
import { setIdentityList } from 'src/store/reducers/identity.reducer';

export const GoogleOauth2 = () => {
  const googleLoginURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${config.googleOauthClientId}&redirect_uri=${window.location.href}&response_type=code&scope=email profile&access_type=offline&prompt=consent`;

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const checkOnboardingMandatoryFields = (profile: User) => {
    const mandatoryFields: (keyof User)[] = ['country', 'city', 'social_causes', 'skills'];

    return mandatoryFields.some((field) => {
      const value = profile[field];
      return value === null || value === '' || (Array.isArray(value) && value.length === 0);
    });
  };

  async function onLoginSucceed(loginResp: AuthRes) {
    await setAuthParams(loginResp, true);
    const path = await nonPermanentStorage.get('savedLocation');
    store.dispatch(setIdentityList(await identities()));
    const userProfile = await profile();
    const userLandingPath = checkOnboardingMandatoryFields(userProfile) ? '/sign-up/user/complete' : '/jobs';
    navigate(path ? path : userLandingPath);
    return loginResp;
  }

  const code = searchParams.get('code');

  useEffect(() => {
    if (!code) {
      window.location.href = googleLoginURL;
      return;
    } else {
      googleOauth(code)
        .then((res) => onLoginSucceed(res))
        .catch(() => navigate('/sign-in'));
    }
  }, [code]);

  return <></>;
};
