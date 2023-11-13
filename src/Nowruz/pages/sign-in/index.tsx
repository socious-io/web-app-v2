import { Logo } from 'public/icons/nowruz/logo';
import { IntroHeader } from 'src/Nowruz/modules/Auth/components/IntroHeader';
import { SignInForm } from 'src/Nowruz/modules/Auth/containers/signin/SignInForm';

export const SignIn = () => {
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
