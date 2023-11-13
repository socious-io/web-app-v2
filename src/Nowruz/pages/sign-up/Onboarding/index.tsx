import React from 'react';
import { Avatar } from 'src/components/atoms/avatar/avatar';
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
        <Avatar type="users" />
      </div>
      <div className="flex flex-col items-center pb-4 sb:h-screen">
        <div className={css.container}>
          <Steper
            components={[
              { Component: <Welcome />, skippable: false },
              { Component: <Causes />, skippable: false },
              { Component: <Skills />, skippable: false },
              { Component: <City />, skippable: false },
              { Component: <ImageBio />, skippable: false },
            ]}
          />
        </div>
      </div>
    </UserProvider>
  );
};
