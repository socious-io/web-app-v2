import css from './desktop.module.scss';
import AddPhoto from '../components/AddPhoto';
import Bio from '../components/Bio';
import Location from '../components/location';
import Name from '../components/name';
import PhoneNumber from '../components/phone-number';
import Skills from '../components/Skills';
import SocialCauses from '../components/social-causes';
import Steper from '../components/steper';
import { UserProvider } from '../sign-up-user-onboarding.context';

export const Desktop = (): JSX.Element => {

  return (
    <UserProvider>
      <div className={css['container']}>
        <Steper
          components={[
            { Component: <Name />, skippable: false },
            { Component: <SocialCauses />, skippable: false },
            { Component: <Skills />, skippable: false },
            { Component: <Location />, skippable: false },
            { Component: <PhoneNumber />, skippable: true },
            { Component: <Bio />, skippable: true },
            { Component: <AddPhoto />, skippable: false },
          ]}
        />
      </div>
    </UserProvider>
  );
};
