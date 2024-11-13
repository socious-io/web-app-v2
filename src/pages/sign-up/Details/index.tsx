import { useTranslation } from 'react-i18next';
import { IntroHeader } from 'src/modules/Auth/components/IntroHeader';
import { UserDetails } from 'src/modules/Auth/containers/signup/UserDetails';
import { steps } from 'src/modules/Auth/statics/sign-up-steps';
import { FeaturedIcon } from 'src/modules/general/components/FeaturedIcon';
import { Stepper } from 'src/modules/general/components/stepper/stepper';
import variables from 'src/styles/constants/_exports.module.scss';

export const Details = () => {
  const { t: translate } = useTranslation();
  return (
    <div className="container mx-auto flex flex-col h-screen pb-16 md:pt-24 pt-12 px-4">
      <div className={`form-container`}>
        <IntroHeader
          title={translate('sign-up-detail-title')}
          description=""
          logo={<FeaturedIcon iconName="user-01" iconColor={variables.color_grey_700} />}
        />
        <div className="mt-5">
          <UserDetails />
        </div>
      </div>
      <div className="flex-1"></div>
      <Stepper activeStep={2} steps={steps} />
    </div>
  );
};
