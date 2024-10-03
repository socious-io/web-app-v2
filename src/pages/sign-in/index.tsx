import { Logo } from 'public/icons/nowruz/logo';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { IntroHeader } from 'src/modules/Auth/components/IntroHeader';
import { SignInForm } from 'src/modules/Auth/containers/signin/SignInForm';
import { RootState } from 'src/store';

export const SignIn = () => {
  const { t: translate } = useTranslation();
  //TODO: remove this duplicate codes but works fine for now
  const status = useSelector((state: RootState) => state.identity.status);
  if (status === 'loading') return <div></div>;
  if (status === 'succeeded') return <Navigate to="/jobs" />;

  return (
    <div className={`pt-12 px-4  md:pt-24 form-container`}>
      <IntroHeader
        title={translate('login-title')}
        description={translate('login-subtitle')}
        logo={<Logo width={48} height={48} />}
      />
      <SignInForm />
    </div>
  );
};
