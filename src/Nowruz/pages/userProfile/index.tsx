import { ProfileHeader } from 'src/Nowruz/modules/userProfile/components/profileHeader';

import { useUserProfile } from './useUserProfile';
import css from './userProfile.module.scss';
import { Impact } from 'src/Nowruz/modules/userProfile/components/impact';
import { Typography } from '@mui/material';

import variables from 'src/components/_exports.module.scss';

export const UserProifle = () => {
  const { user, badges, missions } = useUserProfile();
  console.log('test log resolver', user);

  const bioJSX = (
    <div>
      <Typography className={css.textMd} color={variables.color_gray_700}>
        👋 {user.bio}
      </Typography>
    </div>
  );

  // const connectionJSX=(<div className='flex gap-2'>
  //   <Link
  // </div>)
  return (
    <div>
      <ProfileHeader
        coverImage={user.cover_image}
        profileImage={user.avatar}
        name={`${user.first_name} ${user.last_name}`}
        username={user.username}
      />
      <div className={css.content}>
        <div className={css.leftCol}>
          <Impact point={user.impact_points} />
          {user.bio && bioJSX}
        </div>
        <div className={css.rightCol}></div>
      </div>
    </div>
  );
};
