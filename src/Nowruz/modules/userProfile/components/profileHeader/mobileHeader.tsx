import variables from 'src/components/_exports.module.scss';
import { ConnectStatus, User } from 'src/core/api';
import { Icon } from 'src/Nowruz/general/Icon';
import { AvatarProfile } from 'src/Nowruz/modules/general/components/avatarProfile';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { Dot } from 'src/Nowruz/modules/general/components/dot';
import { IconButton } from 'src/Nowruz/modules/general/components/iconButton';

import css from './profileHeader.module.scss';

interface MobileHeaderProps {
  user: User | undefined;
  myProfile: boolean;
  handleOpenEditInfoModal: () => void;
  handleOpenEditAvatar: () => void;
}
export const MobileHeader: React.FC<MobileHeaderProps> = ({
  user,
  myProfile,
  handleOpenEditInfoModal,
  handleOpenEditAvatar,
}) => {
  const profileImage = user?.avatar;
  const name = `${user?.first_name} ${user?.last_name}`;
  const username = `@${user?.username}`;

  return (
    <div className="block md:hidden">
      <div className={css.avatarMobile}>
        <div className="flex w-full items-end">
          <AvatarProfile
            size="medium"
            imgUrl={profileImage?.url}
            type="users"
            verified={false}
            handleClick={myProfile ? handleOpenEditAvatar : undefined}
          />
          {myProfile && (
            <IconButton
              size="medium"
              iconName="pencil-01"
              iconColor={variables.color_grey_600}
              iconSize={20}
              customStyle="mr-2 ml-auto"
              handleClick={handleOpenEditInfoModal}
            />
          )}
        </div>
        {user?.open_to_work && (
          <div className={css.openToWork}>
            <Dot color={variables.color_success_500} size="small" shadow={false} />
            <span className={css.openToWorkText}>Available for work</span>
          </div>
        )}
        <div className={css.username}>
          <div className="text-2xl md:text-3xl font-semibold text-Gray-light-mode-900">{name}</div>
          <div className="text-base font-normal text-Gray-light-mode-500">{username}</div>
        </div>
      </div>
    </div>
  );
};
