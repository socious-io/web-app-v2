import { IconButton as MUIIconButton } from '@mui/material';
import variables from 'src/components/_exports.module.scss';
import { Icon } from 'src/Nowruz/general/Icon';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { IconButton } from 'src/Nowruz/modules/general/components/iconButton';
import EditAvatarModal from 'src/Nowruz/modules/userProfile/containers/editAvatar';
import { EditInfoModal } from 'src/Nowruz/modules/userProfile/containers/editInfo';

import DesktopHeader from './desktopHeader';
import { MobileHeader } from './mobileHeader';
import css from './profileHeader.module.scss';
import { useProfileHeader } from './useProfileHeader';

export const ProfileHeader = () => {
  const {
    user,
    myProfile,
    isLoggedIn,
    connectStatus,
    openEditInfoModal,
    closeEditInfoModal,
    handleOpenEditInfoModal,
    openEditAvatar,
    handleOpenEditAvatar,
    handleCloseEditAvatar,
  } = useProfileHeader();

  const coverImage = user?.cover_image;

  return (
    <>
      <div className={`${css.container} h-[336px] md:h-[360px] md:mb-12 mb-6`}>
        {myProfile && (
          <MUIIconButton
            aria-label="upload-banner"
            className={`${css.iconCamera} hidden md:block`}
            //onClick={}
          >
            <Icon name="camera-01" color="white" fontSize={20} className={css.camera} />
          </MUIIconButton>
        )}

        <div
          className={`${css.banner} h-40 md:h-60`}
          style={{ backgroundImage: coverImage?.url ? `url(${coverImage?.url})` : 'linear-gradient(#ace0f9, #fff1eb)' }}
        ></div>
        <DesktopHeader
          user={user}
          myProfile={myProfile}
          isLoggedIn={isLoggedIn}
          connectStatus={connectStatus}
          handleOpenEditInfoModal={handleOpenEditInfoModal}
          handleOpenEditAvatar={handleOpenEditAvatar}
        />
        <MobileHeader
          user={user}
          myProfile={myProfile}
          handleOpenEditInfoModal={handleOpenEditInfoModal}
          handleOpenEditAvatar={handleOpenEditAvatar}
        />
      </div>
      <div className="md:hidden">
        {!myProfile && (
          <div className={`${css.actionDiv}  right-4 w-full mb-8`}>
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
      <EditAvatarModal open={openEditAvatar} handleClose={handleCloseEditAvatar} />
      <EditInfoModal open={openEditInfoModal} handleClose={closeEditInfoModal} />
    </>
  );
};
