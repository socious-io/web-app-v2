import React from 'react';
import { IntroHeader } from 'src/Nowruz/modules/Auth/components/IntroHeader';
import { steps } from 'src/Nowruz/modules/Auth/statics/sign-up-steps';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { FeaturedIcon } from 'src/Nowruz/modules/general/components/FeaturedIcon';
import { Stepper } from 'src/Nowruz/modules/general/components/stepper/stepper';

import css from './congrats.module.scss';
export const Congrats = () => {
  return (
    <div className="container mx-auto flex flex-col h-screen pb-16">
      <div className={` md:pt-24 form-container`}>
        <IntroHeader
          title="Log in to your account"
          description=" Welcome back! Please enter your details."
          logo={<FeaturedIcon src="/icons/check-circle.svg" />}
        />
        <div className="mt-8">
          <Button color="primary" block>
            Continue
          </Button>
        </div>
      </div>
      <div className="flex-1"></div>
      <Stepper activeStep={1} steps={steps} />
    </div>
  );
};
