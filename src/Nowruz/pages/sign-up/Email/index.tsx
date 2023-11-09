import { Link, Typography } from '@mui/material';
import { Logo } from 'public/icons/nowruz/logo';
import React from 'react';
import variables from 'src/components/_exports.module.scss';
import { IntroHeader } from 'src/Nowruz/modules/Auth/components/IntroHeader';
import { EmailForm } from 'src/Nowruz/modules/Auth/containers/signup/EmailForm';

import css from './email.module.scss';
export const Email = () => {
  return (
    <div className="container mx-auto flex flex-col h-screen pb-16 md:pt-24 pt-12 px-4">
      <div className={` md:pt-24 form-container`}>
        <IntroHeader
          title="Create an account"
          description="Sign up and start making an impact"
          logo={<Logo width={48} height={48} />}
        />
        <div className="mt-7">
          <EmailForm />
        </div>
        <div className="my-5 text-center">
          <Typography variant="caption" className={css.signupTitle}>
            Already have an account?
          </Typography>
          <Link href="/sign-in" className={`${css.link} mt-5`}>
            Log in
          </Link>
        </div>
        <div className="text-center">
          <Typography variant="caption" className={css.signupTitle}>
            By clicking 'Continue', you acknowledge that you have read and accepted the
          </Typography>
          <Link href="/terms-conditions" className={css.link}>
            Terms of Use
          </Link>
          and
          <Link href="/privacy-policy" className={css.link}>
            Privacy Policy.
          </Link>
        </div>
      </div>
      <div className="flex-1"></div>
      <div className={css.copy}>© Socious Global Inc. 2023</div>
    </div>
  );
};
