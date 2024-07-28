import { useSearchParams } from 'react-router-dom';
import { IntroHeader } from 'src/modules/Auth/components/IntroHeader';
import { OtpForm } from 'src/modules/Auth/containers/forgetPassword/OtpForm';
import { FeaturedIcon } from 'src/modules/general/components/FeaturedIcon';
import variables from 'src/styles/constants/_exports.module.scss';

export const Otp = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';

  return (
    <div className={`pt-12 px-4  md:pt-24 form-container`}>
      <IntroHeader
        title="Check your email"
        description={`We sent a verification link to ${email}`}
        logo={<FeaturedIcon iconName="mail-01" iconColor={variables.color_grey_700} />}
      />
      <OtpForm />
    </div>
  );
};
