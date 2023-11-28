import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CurrentIdentity, Notification } from 'src/core/api';
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
import { IconDropDown } from 'src/Nowruz/modules/general/components/iconDropDown';
import { AllowNotification } from 'src/Nowruz/pages/AllowNotification';
import { logout } from 'src/pages/sidebar/sidebar.service';
import { RootState } from 'src/store';

import css from './onboarding.module.scss';

export const Onboarding = () => {
  const navigate = useNavigate();

  const identities = useSelector<RootState, CurrentIdentity[]>((state) => {
    return state.identity.entities;
  });
  const primary = identities.find((i) => i.primary);
  const type = localStorage.getItem('registerFor');

  const accounts = [
    { id: '1', type: 'users', name: primary?.meta.name, username: primary?.meta.username, img: primary?.meta.avatar },
  ];
  const isMobile = window.innerWidth < 600;
  const items = [
    {
      iconName: 'log-out-01',
      label: 'Log out',
      onClick: () => {
        logout().then(() => {
          navigate('/intro');
        });
      },
    },
  ];
  console.log('type is', type);
  if (type === 'user')
    return (
      <UserProvider>
        <div className="flex flex-row justify-between py-4 px-8">
          <img className={css.headerImage} src={isMobile ? '/icons/logo.svg' : '/icons/logo-text.svg'} />
          <IconDropDown iconItems={items} type={type === 'user' ? 'users' : 'organizations'} accounts={accounts} />
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
        <IconDropDown iconItems={items} type={type === 'user' ? 'users' : 'organizations'} accounts={accounts} />
      </div>
      <div className="flex flex-col items-center pb-4 ">
        <div className={css.container}>
          <Steper
            components={[
              { Component: <OpWelcome />, skippable: false },
              { Component: <CreateOrganization />, skippable: false },
              { Component: <OrganizationType />, skippable: false },
              { Component: <OrganizationCauses />, skippable: false },
              { Component: <OrganizationLogo />, skippable: false },
              { Component: <OrganizationContact />, skippable: false },
            ]}
          />
        </div>
      </div>
    </UserProvider>
  );
};
