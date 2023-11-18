import { Link, Typography } from '@mui/material';
import { Logo } from 'public/icons/nowruz/logo';
import React from 'react';
import variables from 'src/components/_exports.module.scss';
import { IntroHeader } from 'src/Nowruz/modules/Auth/components/IntroHeader';
import ServiceIntro from 'src/Nowruz/modules/Auth/containers/ServiceIntro';
import { EmailForm } from 'src/Nowruz/modules/Auth/containers/signup/EmailForm';
import { reviews } from 'src/Nowruz/modules/Auth/statics/intro';

import css from './email.module.scss';
export const Email = () => {
  const type = localStorage.getItem('registerFor');

  const renderIntro = () => {
    if (type === 'User')
      return (
        <ServiceIntro
          name={reviews.user.name}
          position={reviews.user.position}
          review={reviews.user.review}
          avatar={reviews.user.image}
        />
      );
    return (
      <ServiceIntro
        name={reviews.organization.name}
        position={reviews.organization.position}
        review={reviews.organization.review}
        avatar={reviews.organization.image}
      />
    );
  };
  return (
    <div className="flex h-screen px-4">
      <div className="w-full md:w-1/2 flex flex-col items-center justify-between">
        <div className="form-container">
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
              By continuing, you accept our
            </Typography>
            <Link href="/terms-conditions" className={css.link} underline="hover">
              Terms of Use
            </Link>
            <Typography variant="caption" className={css.signupTitle}>
              and
            </Typography>
            <Link href="/privacy-policy" className={css.link} underline="hover">
              Privacy Policy.
            </Link>
          </div>
        </div>
        <div className={css.copy}>
          <div>© Socious Global Inc. 2023</div>
        </div>
      </div>

      <div className="w-1/2 items-center justify-center hidden md:block">
        <div className={`${css.review} `}>{renderIntro()}</div>
      </div>
    </div>
  );
};
