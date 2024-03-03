import { HorizontalTabs } from 'src/Nowruz/modules/general/components/horizontalTabs';
import { MainInfo } from 'src/Nowruz/modules/userProfile/components/mainInfo';
import { ProfileHeader } from 'src/Nowruz/modules/userProfile/components/profileHeader';

import css from './orgProfile.module.scss';
import { useOrgProfile } from './useOrgProfile';

export const OrgProfile = () => {
  const { tabs, active } = useOrgProfile();

  return (
    <div className="w-full">
      <ProfileHeader />
      <div className={`${css.content} py-0 px-4 md:px-8`}>
        <div className={` ${css.leftCol} hidden md:block`}>
          <MainInfo />
        </div>
        <div className={css.rightCol}>
          <HorizontalTabs tabs={tabs} activeIndex={active} />
        </div>
      </div>
    </div>
  );
};
