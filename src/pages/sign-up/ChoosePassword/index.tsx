import { IntroHeader } from 'src/modules/Auth/components/IntroHeader';
import { ChoosePasswordForm } from 'src/modules/Auth/containers/signup/ChoosePasswordForm';
import { steps } from 'src/modules/Auth/statics/sign-up-steps';
import { FeaturedIcon } from 'src/modules/general/components/FeaturedIcon';
import { Stepper } from 'src/modules/general/components/stepper/stepper';

export const ChoosePassword = () => {
  return (
    <div className="container mx-auto flex flex-col h-screen pb-16 md:pt-24 pt-12 px-4">
      <div className={`form-container`}>
        <IntroHeader title="Choose a password" description="" logo={<FeaturedIcon src="/icons/passcode.svg" />} />
        <ChoosePasswordForm />
      </div>
      <div className="flex-1"></div>
      <Stepper activeStep={1} steps={steps} />
    </div>
  );
};
