import { IconButton } from '@mui/material';
import variables from 'src/components/_exports.module.scss';
import { Icon } from 'src/Nowruz/general/Icon';
import { Avatar } from 'src/Nowruz/modules/general/components/avatar/avatar';
import { Button } from 'src/Nowruz/modules/general/components/Button';

import css from './profileHeader.module.scss';
import { ProfileHeaderProps } from './profileHeader.types';

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  coverImage,
  profileImage,
  name,
  username,
  myProfile,
  isLoggedIn,
  connectStatus,
}) => {
  return (
    <div className={`${css.container} h-[292px] md:h-[360px]`}>
      {myProfile && (
        <button aria-label="upload-banner" className={`${css.iconCamera} hidden md:block`}>
          <Icon name="camera-01" color="white" fontSize={20} className={css.camera} />
        </button>
      )}
      <div
        className={`${css.banner} h-40 md:h-60`}
        style={{ backgroundImage: coverImage?.url ? `url(${coverImage?.url})` : 'linear-gradient(#ace0f9, #fff1eb)' }}
      ></div>
      <div className={`${css.avatar} flex flex-col md:flex-row`}>
        <div className="w-24 md:w-40 h-24 md:h-40">
          <Avatar type="users" size="100%" img={profileImage?.url} />
        </div>
        <div className={css.username}>
          <div className="text-2xl md:text-3xl font-semibold text-Gray-light-mode-900">{name}</div>
          <div className="text-base font-normal text-Gray-light-mode-500">{username}</div>
        </div>
        {myProfile && (
          <div className={`${css.editBtn} right-4 md:right-8`}>
            <Icon name="pencil-01" color={variables.color_grey_600} fontSize={20} />
          </div>
        )}
        {!myProfile && (
          <div className={`${css.actionDiv} right-4 md:right-8 w-full md:w-fit`}>
            <Button color="primary" variant="outlined" style={{ flex: '1', height: '40px', fontSize: '14px' }}>
              <Icon fontSize={20} name="share-01" color={variables.color_grey_700} />
              Share
            </Button>
            {isLoggedIn && connectStatus !== 'CONNECTED' && (
              <Button
                disabled={connectStatus === 'PENDING'}
                color="primary"
                variant="contained"
                style={{ flex: '1', height: '40px', fontSize: '14px' }}
              >
                {connectStatus === 'PENDING' ? 'Request sent' : 'Connect'}
              </Button>
            )}
            <IconButton className={css.iconBtn}>
              <Icon fontSize={20} name="dots-vertical" color={variables.color_grey_700} />
            </IconButton>
          </div>
        )}
      </div>
    </div>
  );
};
