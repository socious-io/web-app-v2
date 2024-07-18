import { HorizontalTabs } from 'src/modules/general/components/horizontalTabs';
import { MainInfo } from 'src/modules/userProfile/components/mainInfo';
import { ProfileHeader } from 'src/modules/userProfile/components/profileHeader';

import css from './userProfile.module.scss';
import { useUserProfile } from './useUserProfile';

export const UserProifle = () => {
  const { tabs } = useUserProfile();

  return (
    <div className="w-full">
      <ProfileHeader />
      <div className={`${css.content} p-4 pt-0 md:p-8 md:pt-0`}>
        <div className={` ${css.leftCol} hidden md:block`}>
          <MainInfo />
        </div>
        <div className={`${css.rightCol} w-full md:w-auto`}>
          <HorizontalTabs tabs={tabs} />
        </div>
      </div>
    </div>
  );
};
