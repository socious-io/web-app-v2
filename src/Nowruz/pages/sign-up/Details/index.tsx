import { Logo } from 'public/icons/nowruz/logo';
import React from 'react';
import { IntroHeader } from 'src/Nowruz/modules/Auth/components/IntroHeader';
import { UserDetails } from 'src/Nowruz/modules/Auth/containers/signup/UserDetails';
import { steps } from 'src/Nowruz/modules/Auth/statics/sign-up-steps';
import { FeaturedIcon } from 'src/Nowruz/modules/general/components/FeaturedIcon';
import { Stepper } from 'src/Nowruz/modules/general/components/stepper/stepper';

export const Details = () => {
  return (
    <div className="container mx-auto flex flex-col h-screen pb-16 md:pt-24 pt-12 px-4">
      <div className={`form-container md:pt-24`}>
        <IntroHeader title="Your details" description="" logo={<FeaturedIcon src="/icons/user-outlined.svg" />} />
        <div className="mt-5">
          <UserDetails />
        </div>
      </div>
      <div className="flex-1"></div>
      <Stepper activeStep={2} steps={steps} />
    </div>
  );
};
