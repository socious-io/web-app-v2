import { HorizontalTabs } from 'src/modules/general/components/horizontalTabs';
import { MainInfo } from 'src/modules/userProfile/components/mainInfo';
import { ProfileHeader } from 'src/modules/userProfile/components/profileHeader';

import styles from './index.module.scss';
import { useOrgProfile } from './useOrgProfile';

export const OrgProfile = () => {
  const {
    data: { tabs, activeTabIndex },
    operations: { setActiveTab },
  } = useOrgProfile();

  return (
    <div className="w-full">
      <ProfileHeader />
      <div className={styles['content']}>
        <div className={styles['content__left']}>
          <MainInfo />
        </div>
        <div className={styles['content__right']}>
          <HorizontalTabs tabs={tabs} activeIndex={activeTabIndex} onActiveIndex={setActiveTab} />
        </div>
      </div>
    </div>
  );
};
