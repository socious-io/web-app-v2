import { ProfileHeader } from 'src/Nowruz/modules/userProfile/components/profileHeader';

import { useUserProfile } from './useUserProfile';
import css from './userProfile.module.scss';

export const UserProifle = () => {
  const { user, badges, missions } = useUserProfile();
  console.log('test log resolver', user);
  return (
    <div>
      <ProfileHeader
        coverImage={user.cover_image}
        profileImage={user.avatar}
        name={`${user.first_name} ${user.last_name}`}
        username={user.username}
      />
      <div className={css.content}>
        <div className={css.leftCol}></div>
        <div className={css.rightCol}></div>
      </div>
    </div>
  );
};
