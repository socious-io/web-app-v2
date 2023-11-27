import { Typography } from '@mui/material';
import { Logo } from 'public/icons/nowruz/logo';
import React from 'react';
import variables from 'src/components/_exports.module.scss';
import { IntroHeader } from 'src/Nowruz/modules/Auth/components/IntroHeader';
import ServiceIntro from 'src/Nowruz/modules/Auth/containers/ServiceIntro';
import { EmailForm } from 'src/Nowruz/modules/Auth/containers/signup/EmailForm';

import css from './email.module.scss';
import { Link } from 'src/Nowruz/modules/general/components/link';
export const Email = () => {
  return (
    <div className="flex h-screen px-4 sm:p-0">
      <div className="w-full md:w-1/2 flex flex-col items-center justify-between">
        <div className="form-container">
          <IntroHeader
            title="Create an account"
            description={type === 'user' ? 'Sign up and start making an impact' : 'Sign up to hire professional'}
            logo={<Logo width={48} height={48} />}
          />
          <div className="mt-7">
            <EmailForm />
          </div>
          <div className="my-5 text-center">
            <Typography variant="caption" className={css.signupTitle}>
              Already have an account?
            </Typography>
            <Link href="/sign-in" label="Log in" customStyle={`${css.link} mt-5`} />
          </div>
          <div className="text-center">
            <Typography variant="caption" className={css.signupTitle}>
              By continuing, you accept our
            </Typography>
            <Link href="/terms-conditions" label=" Terms of Use" />

            <Typography variant="caption" className={css.signupTitle}>
              {` and `}
            </Typography>
            <Link href="/privacy-policy" label=" Privacy Policy." />
          </div>
        </div>
        <div className={css.copy}>
          <div>
            <span className={css.copyText}>© Socious Global Inc. 2023</span>
          </div>
        </div>
      </div>
      <div className="flex-1"></div>
      <div className={css.copy}>© Socious Global Inc. 2023</div>
    </div>
  );
};
