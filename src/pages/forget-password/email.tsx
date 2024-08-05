import { IntroHeader } from 'src/modules/Auth/components/IntroHeader';
import { EmailForm } from 'src/modules/Auth/containers/forgetPassword/EmailForm';
import { FeaturedIcon } from 'src/modules/general/components/FeaturedIcon';
import variables from 'src/styles/constants/_exports.module.scss';

export const Email = () => {
  return (
    <div className={`pt-12 px-4  md:pt-24 form-container`}>
      <IntroHeader
        title="Forgot password?"
        description="No worries, we’ll send you reset instructions."
        logo={<FeaturedIcon iconName="key-01" iconColor={variables.color_grey_700} />}
      />
      <EmailForm />
    </div>
  );
};
