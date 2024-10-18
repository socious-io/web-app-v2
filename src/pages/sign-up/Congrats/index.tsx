import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { nonPermanentStorage } from 'src/core/storage/non-permanent';
import { IntroHeader } from 'src/modules/Auth/components/IntroHeader';
import { steps } from 'src/modules/Auth/statics/sign-up-steps';
import { Button } from 'src/modules/general/components/Button';
import { FeaturedIcon } from 'src/modules/general/components/FeaturedIcon';
import { Stepper } from 'src/modules/general/components/stepper/stepper';

export const Congrats = () => {
  const navigate = useNavigate();
  const { t: translate } = useTranslation();

  const routeToNextPage = async () => {
    const path = await nonPermanentStorage.get('savedLocation');
    navigate(path || '/sign-up/user/onboarding');
  };

  return (
    <div className="container mx-auto flex flex-col h-screen pb-16 md:pt-24 pt-12 px-4">
      <div className={` md:pt-24 form-container`}>
        <IntroHeader
          title={translate('sign-up-congrats')}
          description={translate('sign-up-congrats-desc')}
          logo={<FeaturedIcon src="/icons/check-circle.svg" />}
        />
        <div className="mt-8">
          <Button onClick={routeToNextPage} color="primary" block>
            {translate('sign-up-continue')}
          </Button>
        </div>
      </div>
      <div className="flex-1"></div>
      <Stepper activeStep={3} steps={steps} />
    </div>
  );
};
