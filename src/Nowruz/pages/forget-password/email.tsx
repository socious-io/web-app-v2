import { IntroHeader } from 'src/Nowruz/modules/Auth/components/IntroHeader';
import { EmailForm } from 'src/Nowruz/modules/Auth/containers/forgetPassword/EmailForm';
import { FeaturedIcon } from 'src/Nowruz/modules/general/components/FeaturedIcon';

export const Email = () => {
  return (
    <div className={`pt-12 px-4  md:pt-24 form-container`}>
      <IntroHeader
        title="Forgot password?"
        description="No worries, we’ll send you reset instructions."
        logo={<FeaturedIcon src="/icons/nowruz/key-01.svg" />}
      />
      <EmailForm />
    </div>
  );
};
