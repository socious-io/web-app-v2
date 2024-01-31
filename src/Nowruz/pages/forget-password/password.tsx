import { useSearchParams } from 'react-router-dom';
import { IntroHeader } from 'src/Nowruz/modules/Auth/components/IntroHeader';
import { PasswordForm } from 'src/Nowruz/modules/Auth/containers/forgetPassword/PasswordForm';
import { FeaturedIcon } from 'src/Nowruz/modules/general/components/FeaturedIcon';

export const Password = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';

  return (
    <div className={`pt-12 px-4 md:pt-24 form-container`}>
      <IntroHeader
        title="Set new password"
        description={`We sent a verification link to ${email}`}
        logo={<FeaturedIcon src="/icons/nowruz/lock-01.svg" />}
      />
      <PasswordForm />
    </div>
  );
};
