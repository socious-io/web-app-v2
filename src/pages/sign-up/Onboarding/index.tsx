import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CurrentIdentity, identities, logout, OrgMeta, UserMeta } from 'src/core/api';
import { nonPermanentStorage } from 'src/core/storage/non-permanent';
import { Causes } from 'src/modules/Auth/containers/onboarding/Causes';
import { City } from 'src/modules/Auth/containers/onboarding/City';
import { CreateOrganization } from 'src/modules/Auth/containers/onboarding/CreateOrganization';
import { ImageBio } from 'src/modules/Auth/containers/onboarding/ImageBio';
import { ImportChoices } from 'src/modules/Auth/containers/onboarding/ImportChoices';
import { OpWelcome } from 'src/modules/Auth/containers/onboarding/OpWelcome';
import { OrganizationCauses } from 'src/modules/Auth/containers/onboarding/OrganizationCauses';
import { OrganizationContact } from 'src/modules/Auth/containers/onboarding/OrganizationContact';
import { OrganizationLogo } from 'src/modules/Auth/containers/onboarding/OrganizationLogo';
import { OrganizationType } from 'src/modules/Auth/containers/onboarding/OrganizationType';
import { Skills } from 'src/modules/Auth/containers/onboarding/Skills';
import Steper from 'src/modules/Auth/containers/onboarding/Stepper';
import { Welcome } from 'src/modules/Auth/containers/onboarding/Welcome';
import { UserProvider, useUser } from 'src/modules/Auth/contexts/onboarding/sign-up-user-onboarding.context';
import { AccountItem } from 'src/modules/general/components/avatarDropDown/avatarDropDown.types';
import { IconDropDown } from 'src/modules/general/components/iconDropDown';
import store, { RootState } from 'src/store';
import { removeIdentityList, setIdentityList } from 'src/store/reducers/identity.reducer';
import { setIdentity } from 'src/store/reducers/profile.reducer';

import css from './onboarding.module.scss';

export const Onboarding = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const primary = useSelector<RootState, CurrentIdentity | undefined>(state => {
    return state.identity.entities.find(identity => identity.current);
  });

  useEffect(() => {
    const getIdentities = async () => {
      const resp = await identities();
      await dispatch(setIdentityList(resp));
      const user = {
        id: primary?.id,
        username: (primary?.meta as UserMeta).username || (primary?.meta as OrgMeta).shortname || '',
        email: (primary?.meta as UserMeta).email || (primary?.meta as OrgMeta).email,
      };
      await dispatch(setIdentity(user));
    };
    getIdentities();
  }, []);

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
      onClick: async () => {
        try {
          await logout();
          store.dispatch(removeIdentityList());
          nonPermanentStorage.clear();
          localStorage.clear();
          navigate('/sign-in');
        } catch (e) {
          console.log('error in logout', e);
        }
      },
    },
  ];
  if (type === 'organization')
    return (
      <UserProvider>
        <div className="flex flex-row justify-between py-4 px-8">
          <img className={css.headerImage} src={isMobile ? '/icons/logo.svg' : '/icons/logo-text.svg'} alt="" />
          <IconDropDown iconItems={items} type="users" accounts={accounts} />
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
              { Component: <ImportChoices />, skippable: false },
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
