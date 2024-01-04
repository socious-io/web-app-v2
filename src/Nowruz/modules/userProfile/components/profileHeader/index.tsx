import { IconButton as MUIIconButton } from '@mui/material';
import variables from 'src/components/_exports.module.scss';
import { Icon } from 'src/Nowruz/general/Icon';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { IconButton } from 'src/Nowruz/modules/general/components/iconButton';
import { EditInfoModal } from 'src/Nowruz/modules/userProfile/containers/editInfo';

import DesktopHeader from './desktopHeader';
import { MobileHeader } from './mobileHeader';
import css from './profileHeader.module.scss';
import { useProfileHeader } from './useProfileHeader';
import { EditImageModal } from '../../containers/editImage';

export const ProfileHeader = () => {
  const {
    identity,
    identityType,
    myProfile,
    isLoggedIn,
    connectStatus,
    openEditInfoModal,
    closeEditInfoModal,
    handleOpenEditInfoModal,
    openEditAvatar,
    handleOpenEditAvatar,
    handleCloseEditAvatar,
    openEditHeader,
    handleOpenEditHeader,
    handleCloseEditHeader,
  } = useProfileHeader();

  const coverImage = identity?.cover_image;

  return (
    <>
      <div className={`${css.container} h-[336px] md:h-[360px] md:mb-12 mb-6`}>
        {myProfile && (
          <MUIIconButton aria-label="upload-banner" className={`${css.iconCamera}`} onClick={handleOpenEditHeader}>
            <Icon name="camera-01" color="white" fontSize={20} className={css.camera} />
          </MUIIconButton>
        )}

        <div
          className={`${css.banner} h-40 md:h-60 bg-no-repeat bg-cover`}
          style={{ backgroundImage: coverImage?.url ? `url(${coverImage?.url})` : 'linear-gradient(#ace0f9, #fff1eb)' }}
        ></div>
        <DesktopHeader
          identity={identity}
          myProfile={myProfile}
          isLoggedIn={isLoggedIn}
          connectStatus={connectStatus}
          handleOpenEditInfoModal={handleOpenEditInfoModal}
          handleOpenEditAvatar={handleOpenEditAvatar}
          type={identityType}
        />
        <MobileHeader
          identity={identity}
          type={identityType}
          myProfile={myProfile}
          handleOpenEditInfoModal={handleOpenEditInfoModal}
          handleOpenEditAvatar={handleOpenEditAvatar}
        />
      </div>
      <div className="md:hidden">
        {!myProfile && (
          <div className={`${css.actionDiv} w-full mb-8 px-4`}>
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
              customStyle="w-9 h-10 !border !border-solid !border-Gray-light-mode-300"
            />
          </div>
        )}
      </div>
      <EditImageModal open={openEditAvatar} handleClose={handleCloseEditAvatar} type="avatar" />
      <EditImageModal open={openEditHeader} handleClose={handleCloseEditHeader} type="header" />
      <EditInfoModal open={openEditInfoModal} handleClose={closeEditInfoModal} />
    </>
  );
};
