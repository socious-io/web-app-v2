import React from 'react';
import { ConnectStatus, Organization, User } from 'src/core/api';
import { getIdentityMeta } from 'src/core/utils';
import { ThreeDotsButton } from 'src/modules/connections/threeDotsButton';
import { AvatarProfile } from 'src/modules/general/components/avatarProfile';
import { Button } from 'src/modules/general/components/Button';
import { Chip } from 'src/modules/general/components/Chip';
import { Dot } from 'src/modules/general/components/dot';
import { Icon } from 'src/modules/general/components/Icon';
import { IconButton } from 'src/modules/general/components/iconButton';
import variables from 'src/styles/constants/_exports.module.scss';

import css from './profileHeader.module.scss';

interface DesktopHeaderProps {
  identity: User | Organization | undefined;
  type: 'users' | 'organizations';
  myProfile: boolean;
  isLoggedIn: boolean;
  connectStatus: ConnectStatus | null | undefined;
  handleOpenEditInfoModal: () => void;
  handleOpenQRCodeModal: () => void;
  handleOpenEditAvatar: () => void;
  handleMessage?: () => void;
  setOpenConnectRequest: (val: boolean) => void;
  displayConnectButton: () => boolean;
  displayMessageButton: () => boolean;
  displayThreeDotsButton: () => boolean;
}
export const DesktopHeader: React.FC<DesktopHeaderProps> = ({
  identity,
  myProfile,
  isLoggedIn,
  connectStatus,
  handleOpenEditInfoModal,
  handleOpenQRCodeModal,
  handleOpenEditAvatar,
  type,
  handleMessage,
  setOpenConnectRequest,
  displayConnectButton,
  displayMessageButton,
  displayThreeDotsButton,
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

        <div className={`${css.actionDiv} right-8 w-fit`}>
          <Button
            color="primary"
            variant="outlined"
            style={{ height: '40px', fontSize: '14px', display: 'flex', gap: '6px' }}
            onClick={handleOpenQRCodeModal}
          >
            <Icon fontSize={20} name="share-01" color={variables.color_grey_700} />
            Share
          </Button>
          {displayMessageButton() && (
            <Button
              color="primary"
              variant={displayConnectButton() ? 'outlined' : 'contained'}
              style={{ height: '40px', fontSize: '14px' }}
              onClick={handleMessage}
            >
              Message
            </Button>
          )}
          {displayConnectButton() && (
            <Button
              disabled={connectStatus === 'PENDING'}
              color="primary"
              variant="contained"
              style={{ height: '40px', fontSize: '14px' }}
              onClick={() => setOpenConnectRequest(true)}
            >
              {connectStatus === 'PENDING' ? 'Request sent' : 'Connect'}
            </Button>
          )}
          {displayThreeDotsButton() && <ThreeDotsButton otherIdentityId={identity?.id || ''} />}
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
      </div>
    </div>
  );
};

export default DesktopHeader;
