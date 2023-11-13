import variables from 'src/components/_exports.module.scss';
import { Icon } from 'src/Nowruz/general/Icon';
import { Avatar } from 'src/Nowruz/modules/general/components/avatar/avatar';

import css from './profileHeader.module.scss';
import { ProfileHeaderProps } from './profileHeader.types';

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ coverImage, profileImage, name, username }) => {
  return (
    <div className={css.container}>
      <button aria-label="upload-banner" className={css.iconCamera}>
        <Icon name="camera-01" color="white" fontSize={20} className={css.camera} />
      </button>
      <div
        className={css.banner}
        style={{ backgroundImage: coverImage?.url ? `url(${coverImage?.url})` : 'linear-gradient(#ace0f9, #fff1eb)' }}
      ></div>
      <div className={css.avatar}>
        <Avatar type="users" size="160px" img={profileImage?.url} />
        <div className={css.username}>
          <h1>{name}</h1>
          <h6>{username}</h6>
        </div>
        <div className={css.editBtn}>
          <Icon name="pencil-01" color={variables.color_grey_600} fontSize={20} />
        </div>
      </div>
    </div>
  );
};
