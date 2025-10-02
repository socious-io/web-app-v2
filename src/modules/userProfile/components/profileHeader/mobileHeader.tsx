import React from 'react';
import { Organization, User } from 'src/core/api';
import { getIdentityMeta, translate } from 'src/core/utils';
import { AvatarProfile } from 'src/modules/general/components/avatarProfile';
import { Chip } from 'src/modules/general/components/Chip';
import { Dot } from 'src/modules/general/components/dot';
import { IconButton } from 'src/modules/general/components/iconButton';
import variables from 'src/styles/constants/_exports.module.scss';

import css from './profileHeader.module.scss';

interface MobileHeaderProps {
  identity: User | Organization | undefined;
  myProfile: boolean;
  handleOpenEditInfoModal: () => void;
  handleOpenEditAvatar: () => void;
  type: 'users' | 'organizations';
  userTags: string[];
}
export const MobileHeader: React.FC<MobileHeaderProps> = ({
  identity,
  myProfile,
  handleOpenEditInfoModal,
  handleOpenEditAvatar,
  type,
  userTags,
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
            <span className={css.statusText}>{translate('profile-header.available-for-work')}</span>
          </div>
        )}

        {type === 'users' && !!userTags.length && (
          <div className="flex flex-wrap gap-2 mt-2">
            {userTags.map(tag => (
              <Chip key={tag} label={tag} size="lg" theme="secondary" shape="sharp" />
            ))}
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
