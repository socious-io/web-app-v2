import { Logo } from 'public/icons/dynamic/logo';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { IntroHeader } from 'src/modules/Auth/components/IntroHeader';
import { VerifyForm } from 'src/modules/Auth/containers/signup/VerifyForm';
import { steps } from 'src/modules/Auth/statics/sign-up-steps';
import { FeaturedIcon } from 'src/modules/general/components/FeaturedIcon';
import { Icon } from 'src/modules/general/components/Icon';
import { Stepper } from 'src/modules/general/components/stepper/stepper';

import css from './verify.module.scss';
export const Verify = () => {
  const email = localStorage.getItem('email') as string;
  const { t: translate } = useTranslation();

  return (
    <div className="container mx-auto flex flex-col h-screen pb-16 md:pt-24 pt-12 px-4">
      <div className={`${css.verify} md:pt-24`}>
        <IntroHeader
          title={translate('sign-up-verification-title')}
          description={translate('sign-up-verification-subtitle')}
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
