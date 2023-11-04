import { Logo } from 'public/icons/nowruz/logo';
import { IntroHeader } from 'src/Nowruz/modules/Auth/components/IntroHeader';
import { ChoosePasswordForm } from 'src/Nowruz/modules/Auth/containers/signup/ChoosePasswordForm';
import { FeaturedIcon } from 'src/Nowruz/modules/general/components/FeaturedIcon';
export const ChoosePassword = () => {
  return (
    <div className={`md:pt-24 form-container`}>
      <IntroHeader title="Choose a password" description="" logo={<FeaturedIcon src="/icons/passcode.svg" />} />
      <ChoosePasswordForm />
    </div>
  );
};
