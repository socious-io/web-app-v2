import React from 'react';
import variables from 'src/components/_exports.module.scss';
import { ConnectStatus, Organization, User } from 'src/core/api';
import { getIdentityMeta } from 'src/core/utils';
import { AvatarProfile } from 'src/Nowruz/modules/general/components/avatarProfile';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { Chip } from 'src/Nowruz/modules/general/components/Chip';
import { Dot } from 'src/Nowruz/modules/general/components/dot';
import { IconButton } from 'src/Nowruz/modules/general/components/iconButton';

import css from './profileHeader.module.scss';

interface DesktopHeaderProps {
  identity: User | Organization | undefined;
  type: 'users' | 'organizations';
  myProfile: boolean;
  isLoggedIn: boolean;
  connectStatus: ConnectStatus | undefined;
  handleOpenEditInfoModal: () => void;
  handleOpenEditAvatar: () => void;
}
export const DesktopHeader: React.FC<DesktopHeaderProps> = ({
  identity,
  myProfile,
  isLoggedIn,
  connectStatus,
  handleOpenEditInfoModal,
  handleOpenEditAvatar,
  type,
}) => {
  const { username, name, profileImage } = getIdentityMeta(identity);
  return (
    <div className="hidden md:block">
      <div className={css.avatar}>
        <AvatarProfile
          size="large"
          imgUrl={profileImage}
          type={type}
          verified={false}
          handleClick={myProfile ? handleOpenEditAvatar : undefined}
        />
        <div className={css.username}>
          <div className={css.profileState}>
            <div className="text-2xl md:text-3xl font-semibold text-Gray-light-mode-900">{name}</div>
            {type === 'users' && (identity as User).open_to_work && (
              <Chip
                label="Available for work"
                size="lg"
                theme="secondary"
                startIcon={<Dot color={variables.color_success_500} size="small" shadow={false} />}
                shape="sharp"
              />
            )}
            {type === 'users' && (identity as User).open_to_volunteer && (
              <Chip
                label="Open to volunteer"
                size="lg"
                theme="secondary"
                startIcon={<Dot color={variables.color_success_500} size="small" shadow={false} />}
                shape="sharp"
              />
            )}

            {type === 'organizations' && (identity as Organization).hiring && (
              <Chip
                label="Hiring"
                size="lg"
                theme="secondary"
                startIcon={<Dot color={variables.color_success_500} size="small" shadow={false} />}
                shape="sharp"
              />
            )}
          </div>
          <div className="text-base font-normal text-Gray-light-mode-500">{username}</div>
        </div>

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
        {!myProfile && (
          <div className={`${css.actionDiv} right-8 w-fit`}>
            {/* <Button color="primary" variant="outlined" className={css.shareButton}>
              <Icon fontSize={20} name="share-01" color={variables.color_grey_700} />
              Share
            </Button> */}
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
            {/* <IconButton
              size="small"
              iconName="dots-vertical"
              iconColor={variables.color_grey_700}
              iconSize={20}
              customStyle="w-9 h-10 !border !border-solid !border-Gray-light-mode-300"
            /> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default DesktopHeader;
