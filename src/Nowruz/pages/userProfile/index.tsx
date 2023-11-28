import { HorizontalTabs } from 'src/Nowruz/modules/general/components/horizontalTabs';
import { MainInfo } from 'src/Nowruz/modules/userProfile/components/mainInfo';
import { ProfileHeader } from 'src/Nowruz/modules/userProfile/components/profileHeader';

import css from './userProfile.module.scss';
import { useUserProfile } from './useUserProfile';

export const UserProifle = () => {
  const { user, badges, missions, tabs, myProfile, isLoggedIn, connectStatus } = useUserProfile();

  return (
    <div className="w-full">
      <ProfileHeader
        coverImage={user.cover_image}
        profileImage={user.avatar}
        name={`${user.first_name} ${user.last_name}`}
        username={user.username}
        myProfile={myProfile}
        isLoggedIn={isLoggedIn}
        connectStatus={connectStatus}
      />
      <div className={`${css.content} py-0 px-4 md:px-8`}>
        <div className={` ${css.leftCol} hidden md:block`}>
          <MainInfo user={user} myProfile={myProfile} />
        </div>
        <div className={css.rightCol}>
          <HorizontalTabs tabs={tabs} />
        </div>
      </div>
    </div>
  );
};
