import { Logo } from 'public/icons/nowruz/logo';
import React from 'react';
import { Icon } from 'src/Nowruz/general/Icon';
import { IntroHeader } from 'src/Nowruz/modules/Auth/components/IntroHeader';
import { VerifyForm } from 'src/Nowruz/modules/Auth/containers/signup/VerifyForm';
import { steps } from 'src/Nowruz/modules/Auth/statics/sign-up-steps';
import { FeaturedIcon } from 'src/Nowruz/modules/general/components/FeaturedIcon';
import { Stepper } from 'src/Nowruz/modules/general/components/stepper/stepper';

import css from './verify.module.scss';
export const Verify = () => {
  const email = localStorage.getItem('email') as string;

  return (
    <div className="container mx-auto flex flex-col h-screen pb-16 md:pt-24 pt-12 px-4">
      <div className={`${css.verify} md:pt-24`}>
        <IntroHeader
          title="Check your email"
          description={`We sent a verification link to`}
          subtitle={email}
          logo={<FeaturedIcon iconName="mail-01" />}
        />
        <div className="mt-8">
          <VerifyForm />
        </div>
      </div>
      <div className="flex-1"></div>
      <Stepper activeStep={0} steps={steps} />
    </div>
  );
};
