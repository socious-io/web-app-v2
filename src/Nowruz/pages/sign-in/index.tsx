import { Logo } from 'public/icons/nowruz/logo';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { IntroHeader } from 'src/Nowruz/modules/Auth/components/IntroHeader';
import { SignInForm } from 'src/Nowruz/modules/Auth/containers/signin/SignInForm';

export const SignIn = () => {
  //TODO: remove this duplicate codes but works fine for now
  const status = useSelector((state: RootState) => state.identity.status);
  if (status === 'loading') return <div></div>;
  if (status === 'succeeded') return <Navigate to="/jobs" />;

  return (
    <div className={`pt-12 px-4  md:pt-24 form-container`}>
      <IntroHeader
        title="Log in to your account"
        description=" Welcome back! Please enter your details."
        logo={<Logo width={48} height={48} />}
      />
      <SignInForm />
    </div>
  );
};
