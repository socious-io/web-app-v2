import React from 'react';
import { Avatar } from 'src/components/atoms/avatar/avatar';
import { isTouchDevice } from 'src/core/device-type-detector';
import { Causes } from 'src/Nowruz/modules/Auth/containers/onboarding/Causes';
import { City } from 'src/Nowruz/modules/Auth/containers/onboarding/City';
import { CreateOrganization } from 'src/Nowruz/modules/Auth/containers/onboarding/CreateOrganization';
import { ImageBio } from 'src/Nowruz/modules/Auth/containers/onboarding/ImageBio';
import { OpWelcome } from 'src/Nowruz/modules/Auth/containers/onboarding/OpWelcome';
import { OrganizationCauses } from 'src/Nowruz/modules/Auth/containers/onboarding/OrganizationCauses';
import { OrganizationContact } from 'src/Nowruz/modules/Auth/containers/onboarding/OrganizationContact';
import { OrganizationLogo } from 'src/Nowruz/modules/Auth/containers/onboarding/OrganizationLogo';
import { OrganizationType } from 'src/Nowruz/modules/Auth/containers/onboarding/OrganizationType';
import { Skills } from 'src/Nowruz/modules/Auth/containers/onboarding/Skills';
import Steper from 'src/Nowruz/modules/Auth/containers/onboarding/Stepper';
import { Welcome } from 'src/Nowruz/modules/Auth/containers/onboarding/Welcome';
import { UserProvider } from 'src/Nowruz/modules/Auth/contexts/onboarding/sign-up-user-onboarding.context';

import css from './onboarding.module.scss';
export const Onboarding = () => {
  const isMobile = isTouchDevice();
  const type = localStorage.getItem('registerFor');
  if (type === 'user')
    return (
      <UserProvider>
        <div className="flex flex-row justify-between py-4 px-8">
          <img className={css.headerImage} src={isMobile ? '/icons/logo.svg' : '/icons/logo-text.svg'} />
          <Avatar type={type === 'user' ? 'users' : 'organizations'} />
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
              { Component: <OrganizationContact />, skippable: false },
              { Component: <CreateOrganization />, skippable: false },
              { Component: <OpWelcome />, skippable: false },
              { Component: <OrganizationType />, skippable: false },
              { Component: <OrganizationCauses />, skippable: false },
              { Component: <OrganizationLogo />, skippable: false },
            ]}
          />
        </div>
      </div>
    </UserProvider>
  );
};
// { Component: <OpWelcome />, skippable: false },
// { Component: <CreateOrganization />, skippable: false },
// { Component: <OrganizationType />, skippable: false },
// { Component: <OrganizationCauses />, skippable: false },
// { Component: <OrganizationLogo />, skippable: false },
// { Component: <OrganizationContact />, skippable: false },
