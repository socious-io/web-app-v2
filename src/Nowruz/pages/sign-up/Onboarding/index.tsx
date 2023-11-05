import React from 'react';
import { isTouchDevice } from 'src/core/device-type-detector';
import { Causes } from 'src/Nowruz/modules/Auth/containers/onboarding/Causes';
import { City } from 'src/Nowruz/modules/Auth/containers/onboarding/City';
import { ImageBio } from 'src/Nowruz/modules/Auth/containers/onboarding/ImageBio';
import { Skills } from 'src/Nowruz/modules/Auth/containers/onboarding/Skills';
import Steper from 'src/Nowruz/modules/Auth/containers/onboarding/Stepper';
import { Welcome } from 'src/Nowruz/modules/Auth/containers/onboarding/Welcome';
import { UserProvider } from 'src/Nowruz/modules/Auth/contexts/onboarding/sign-up-user-onboarding.context';

import css from './onboarding.module.scss';
export const Onboarding = () => {
  const isMobile = isTouchDevice();

  return (
    <UserProvider>
      <div className="flex flex-row justify-between py-4 px-8">
        <img className={css.headerImage} src={isMobile ? '/icons/logo.svg' : '/icons/logo-text.svg'} />
        <div className={css.user}>
          <img src="/icons/user-outlined.svg" />
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className={css.container}>
          <Steper
            components={[
              { Component: <ImageBio />, skippable: false },
              { Component: <Causes />, skippable: false },
              { Component: <Skills />, skippable: false },
              { Component: <Welcome />, skippable: false },
              { Component: <City />, skippable: false },
            ]}
          />
        </div>
      </div>
    </UserProvider>
  );
};
