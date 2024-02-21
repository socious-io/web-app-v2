import React from 'react';
import variables from 'src/components/_exports.module.scss';
import { Organization, User } from 'src/core/api';
import { getIdentityMeta } from 'src/core/utils';
import { AvatarProfile } from 'src/Nowruz/modules/general/components/avatarProfile';
import { Dot } from 'src/Nowruz/modules/general/components/dot';
import { IconButton } from 'src/Nowruz/modules/general/components/iconButton';

import css from './profileHeader.module.scss';

interface MobileHeaderProps {
  identity: User | Organization | undefined;
  myProfile: boolean;
  handleOpenEditInfoModal: () => void;
  handleOpenEditAvatar: () => void;
  type: 'users' | 'organizations';
}
export const MobileHeader: React.FC<MobileHeaderProps> = ({
  identity,
  myProfile,
  handleOpenEditInfoModal,
  handleOpenEditAvatar,
  type,
}) => {
  const { profileImage, name, username } = getIdentityMeta(identity);
  return (
    <div className="block md:hidden">
      <div className={css.avatarMobile}>
        <div className="flex w-full items-end">
          <AvatarProfile
            size="medium"
            imgUrl={profileImage}
            type={type}
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
        {type === 'users' && (identity as User).open_to_work && (
          <div className={css.status}>
            <Dot color={variables.color_success_500} size="small" shadow={false} />
            <span className={css.statusText}>Available for work</span>
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
