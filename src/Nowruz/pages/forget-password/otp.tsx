import { useSearchParams } from 'react-router-dom';
import { IntroHeader } from 'src/Nowruz/modules/Auth/components/IntroHeader';
import { OtpForm } from 'src/Nowruz/modules/Auth/containers/forgetPassword/OtpForm';
import { FeaturedIcon } from 'src/Nowruz/modules/general/components/FeaturedIcon';

export const Otp = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';

  return (
    <div className={`pt-12 px-4  md:pt-24 form-container`}>
      <IntroHeader
        title="Check your email"
        description={`We sent a verification link to ${email}`}
        logo={<FeaturedIcon src="/icons/nowruz/mail-01.svg" />}
      />
      <OtpForm />
    </div>
  );
};
