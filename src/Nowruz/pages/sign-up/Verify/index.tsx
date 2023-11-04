import { Logo } from 'public/icons/nowruz/logo';
import React from 'react';
import { IntroHeader } from 'src/Nowruz/modules/Auth/components/IntroHeader';
import { VerifyForm } from 'src/Nowruz/modules/Auth/containers/signup/VerifyForm';

import css from './verify.module.scss';
export const Verify = () => {
  return (
    <div className={`${css.verify} md:pt-24`}>
      <IntroHeader
        title="Check your email"
        description="We sent a verification link to umaya.nigina@gmail.com"
        logo={<Logo width={48} height={48} />}
      />
      <div className="mt-8">
        <VerifyForm />
      </div>
    </div>
  );
};
