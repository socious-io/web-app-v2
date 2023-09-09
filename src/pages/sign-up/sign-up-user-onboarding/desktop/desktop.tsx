import css from './desktop.module.scss';
import Steper from '../components/steper';
import SocialCauses from '../components/social-causes';
import Location from '../components/location';
import PhoneNumber from '../components/phone-number';
import { UserProvider } from '../sign-up-user-onboarding.context';
import Bio from '../components/Bio';
import AddPhoto from '../components/AddPhoto';
import Skills from '../components/Skills';
import { useNavigate } from '@tanstack/react-location';
import Name from '../components/name';

export const Desktop = (): JSX.Element => {
  const navigate = useNavigate();

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
