import { CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { config } from 'src/config';
import { getAuthUrlAdaptor, sociousOauthAdaptor } from 'src/core/adaptors/auth/index.adaptors';
import { AuthRes } from 'src/core/api';
import { setAuthParams, switchAccount } from 'src/core/api/auth/auth.service';
import { translate } from 'src/core/utils';

export const Referral = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const referredBy = searchParams.get('referred_by') || '';
  const identityId = searchParams.get('identity_id');

  const fetchAuthURL = async () => {
    const { error, data } = await getAuthUrlAdaptor(config.appBaseURL + '/oauth/socious');
    if (error) return;
    else if (data) return data.url;
  };

  async function onLoginSucceed(loginRes: AuthRes) {
    await setAuthParams(loginRes, true);
    if (typeof identityId === 'string') switchAccount(identityId);
    navigate('/');
    return loginRes;
  }

  useEffect(() => {
    const handleSociousOauth = async (authCode: string) => {
      const { error, data } = await sociousOauthAdaptor(authCode);
      if (error) navigate('/intro');
      else if (data) onLoginSucceed(data);
    };

    const redirectToAuthURL = async () => {
      const authURL = await fetchAuthURL();
      if (authURL) {
        const url = new URL(authURL);
        url.searchParams.set('auth_mode', 'register');
        url.searchParams.set('referred_by', referredBy);
        window.location.href = url.toString();
      }
    };

    if (!code) {
      redirectToAuthURL();
      return;
    }

    handleSociousOauth(code);
  }, [code]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-Gray-light-mode-50">
      <div className="max-w-md w-full flex flex-col items-center gap-6 p-6 bg-Brand-50 border border-solid border-Brand-100 rounded-2xl shadow-xl text-center">
        <img src="/images/logo/logo.svg" alt="Socious Work Logo" width={48} height={48} />
        <h1 className="text-Brand-700 text-2xl font-semibold">{translate('refer-invited')}</h1>
        <p className="text-Gray-light-mode-600 leading-relaxed">
          <span className="font-semibold">@{referredBy}</span>
          <br />
          {translate('refer-who-invited')}
          <br />
          {translate('refer-register')}
        </p>
        <div className="flex justify-center items-center gap-2">
          <CircularProgress size={20} color="primary" />
          <span className="text-Brand-900 text-sm font-medium">{translate('refer-redirect')}</span>
        </div>
      </div>
    </div>
  );
};
