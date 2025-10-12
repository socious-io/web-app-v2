import { HorizontalTabs } from 'src/modules/general/components/horizontalTabs';
import { MainInfo } from 'src/modules/userProfile/components/mainInfo';
import { ProfileHeader } from 'src/modules/userProfile/components/profileHeader';

import styles from './index.module.scss';
import { useUserProfile } from './useUserProfile';

export const UserProfile = () => {
  const {
    data: { currentUser, tabs, activeTabIndex, userTags },
  } = useUserProfile();

  if (!currentUser) return;

  return (
    <div className="w-full">
      <ProfileHeader userTags={userTags} />
      <div className={styles['content']}>
        <div className={styles['content__left']}>
          <MainInfo />
        </div>
        <div className={styles['content__right']}>
          <HorizontalTabs tabs={tabs} activeIndex={activeTabIndex} />
        </div>
      </div>
    </div>
  );
};
