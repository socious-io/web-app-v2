import { IntroHeader } from 'src/Nowruz/modules/Auth/components/IntroHeader';
import { ChoosePasswordForm } from 'src/Nowruz/modules/Auth/containers/signup/ChoosePasswordForm';
import { steps } from 'src/Nowruz/modules/Auth/statics/sign-up-steps';
import { FeaturedIcon } from 'src/Nowruz/modules/general/components/FeaturedIcon';
import { Stepper } from 'src/Nowruz/modules/general/components/stepper/stepper';

export const ChoosePassword = () => {
  return (
    <div className="container mx-auto flex flex-col h-screen pb-16 md:pt-24 pt-12 px-4">
      <div className={` md:pt-24 form-container`}>
        <IntroHeader title="Choose a password" description="" logo={<FeaturedIcon src="/icons/passcode.svg" />} />
        <ChoosePasswordForm />
      </div>
      <div className="flex-1"></div>
      <Stepper activeStep={1} steps={steps} />
    </div>
  );
};
