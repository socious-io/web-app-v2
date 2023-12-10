import variables from 'src/components/_exports.module.scss';
import { ConnectStatus, User } from 'src/core/api';
import { Icon } from 'src/Nowruz/general/Icon';
import { AvatarProfile } from 'src/Nowruz/modules/general/components/avatarProfile';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { Dot } from 'src/Nowruz/modules/general/components/dot';
import { IconButton } from 'src/Nowruz/modules/general/components/iconButton';

import css from './profileHeader.module.scss';

interface DesktopHeaderProps {
  user: User | undefined;
  myProfile: boolean;
  isLoggedIn: boolean;
  connectStatus: ConnectStatus | undefined;
  handleOpenEditInfoModal: () => void;
  handleOpenEditAvatar: () => void;
}
export const DesktopHeader: React.FC<DesktopHeaderProps> = ({
  user,
  myProfile,
  isLoggedIn,
  connectStatus,
  handleOpenEditInfoModal,
  handleOpenEditAvatar,
}) => {
  const profileImage = user?.avatar;
  const name = `${user?.first_name} ${user?.last_name}`;
  const username = user?.username;

  return (
    <div className="hidden md:block">
      <div className={css.avatar}>
        <AvatarProfile
          size="large"
          imgUrl={profileImage?.url}
          type="users"
          verified={false}
          handleClick={handleOpenEditAvatar}
        />
        <div className={css.username}>
          <div className="text-2xl md:text-3xl font-semibold text-Gray-light-mode-900">{name}</div>
          <div className="text-base font-normal text-Gray-light-mode-500">{username}</div>
        </div>
        {user?.open_to_work && (
          <div className={css.openToWork}>
            <Dot color={variables.color_success_500} size="small" shadow={false} />
            <span className={css.openToWorkText}>Available for work</span>
          </div>
        )}
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
            <IconButton
              size="small"
              iconName="dots-vertical"
              iconColor={variables.color_grey_700}
              iconSize={20}
              customStyle="w-9 h-10"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DesktopHeader;
