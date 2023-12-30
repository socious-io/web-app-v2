import React from 'react';
import { useDispatch } from 'react-redux';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { CurrentIdentity, OrgMeta, UserMeta } from 'src/core/api';
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
import { AccountItem } from 'src/Nowruz/modules/general/components/avatarDropDown/avatarDropDown.types';
import { IconDropDown } from 'src/Nowruz/modules/general/components/iconDropDown';
import { logout } from 'src/pages/sidebar/sidebar.service';
import { setIdentityList } from 'src/store/reducers/identity.reducer';
import { setUser } from 'src/store/reducers/profile.reducer';

import css from './onboarding.module.scss';

export const Onboarding = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const identities = useLoaderData() as CurrentIdentity[];
  dispatch(setIdentityList(identities));

  const primary = identities.find((i) => i.primary);

  const user = {
    id: primary?.id,
    username: (primary?.meta as UserMeta).username || (primary?.meta as OrgMeta).shortname || '',
    email: (primary?.meta as UserMeta).email || (primary?.meta as OrgMeta).email,
  };
  dispatch(setUser(user));

  const type = localStorage.getItem('registerFor');

  const accounts: AccountItem[] = [
    {
      id: primary?.id || '',
      type: 'users',
      name: primary?.meta.name || '',
      username: (primary?.meta as UserMeta).username || (primary?.meta as OrgMeta).shortname,
      img: (primary?.meta as UserMeta).avatar || (primary?.meta as OrgMeta).image,
      selected: true,
    },
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
  if (type === 'organization')
    return (
      <UserProvider>
        <div className="flex flex-row justify-between py-4 px-8">
          <img className={css.headerImage} src={isMobile ? '/icons/logo.svg' : '/icons/logo-text.svg'} alt="" />
          <IconDropDown iconItems={items} type="organizations" accounts={accounts} />
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
  return (
    <UserProvider>
      <div className="flex flex-row justify-between py-4 px-8">
        <img className={css.headerImage} src={isMobile ? '/icons/logo.svg' : '/icons/logo-text.svg'} />
        <IconDropDown iconItems={items} type="users" accounts={accounts} />
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
