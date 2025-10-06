import { IconButton as MUIIconButton } from '@mui/material';
import { translate } from 'src/core/utils';
import { ConnectRequestModal } from 'src/modules/connections/connectRequestModal';
import { ThreeDotsButton } from 'src/modules/connections/threeDotsButton';
import AlertMessage from 'src/modules/general/components/AlertMessage';
import { Button } from 'src/modules/general/components/Button';
import { Icon } from 'src/modules/general/components/Icon';
import { EditInfoModal } from 'src/modules/userProfile/containers/editInfo';
import variables from 'src/styles/constants/_exports.module.scss';

import DesktopHeader from './desktopHeader';
import { MobileHeader } from './mobileHeader';
import css from './profileHeader.module.scss';
import { useProfileHeader } from './useProfileHeader';
import { EditImageModal } from '../../containers/editImage';
import { EditInfoOrgModal } from '../../containers/editInfoOrg';
import { ShareProfile } from '../../containers/shareProfile';

interface ProfileHeaderProps {
  userTags?: string[];
}

export const ProfileHeader = ({ userTags = [] }: ProfileHeaderProps) => {
  const {
    identity,
    identityType,
    myProfile,
    isLoggedIn,
    connectStatus,
    openEditInfoModal,
    closeEditInfoModal,
    handleOpenEditInfoModal,
    openQRCodeModal,
    closeQRCodeModal,
    handleOpenQRCodeModal,
    openEditAvatar,
    handleOpenEditAvatar,
    handleCloseEditAvatar,
    openEditHeader,
    handleOpenEditHeader,
    handleCloseEditHeader,
    openEditInfoOrgModal,
    closeEditInfoOrgModal,
    redirectToChat,
    openConnectRequest,
    setOpenConnectRequest,
    displayConnectButton,
    displayMessageButton,
    displayThreeDotsButton,
    displayVerifyAlert,
  } = useProfileHeader();

  const coverImage = identity?.cover_image;

  return (
    <>
      {displayVerifyAlert && (
        <AlertMessage
          theme="warning"
          iconName="alert-circle"
          title={translate('profile-header.verify-identity.title')}
          subtitle={translate('profile-header.verify-identity.subtitle')}
        >
          <div className="flex">
            <button className="cursor-pointer border-none text-sm leading-5 font-semibold text-Warning-600">
              {translate('profile-header.verify-identity.learn-more')}
            </button>
            <button className="cursor-pointer border-none flex">
              <div className="text-sm leading-5 font-semibold text-Error-700 pl-3 pr-2">
                {translate('profile-header.verify-identity.verify-now')}
              </div>
              <Icon name="arrow-right" fontSize={20} color={variables.color_error_700} />
            </button>
          </div>
        </AlertMessage>
      )}

      <div className={`${css.container} md:mb-12 mb-6`}>
        {myProfile && (
          <MUIIconButton
            aria-label={translate('profile-header.upload-banner')}
            className={`${css.iconCamera}`}
            onClick={handleOpenEditHeader}
          >
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
          handleOpenQRCodeModal={handleOpenQRCodeModal}
          handleOpenEditAvatar={handleOpenEditAvatar}
          type={identityType}
          handleMessage={redirectToChat}
          setOpenConnectRequest={setOpenConnectRequest}
          displayConnectButton={displayConnectButton}
          displayMessageButton={displayMessageButton}
          displayThreeDotsButton={displayThreeDotsButton}
          userTags={userTags}
        />
        <MobileHeader
          identity={identity}
          type={identityType}
          myProfile={myProfile}
          handleOpenEditInfoModal={handleOpenEditInfoModal}
          handleOpenEditAvatar={handleOpenEditAvatar}
          userTags={userTags}
        />
      </div>
      <div className="md:hidden">
        <div className={`${css.actionDiv} w-full mb-8 px-4`}>
          <Button
            fullWidth
            color="primary"
            variant="outlined"
            customStyle="h-10 text-sm flex gap-1.5 py-0"
            onClick={handleOpenQRCodeModal}
          >
            <Icon fontSize={20} name="share-01" color={variables.color_grey_700} />
            {translate('profile-header.actions.share')}
          </Button>
          {displayConnectButton() && (
            <Button
              fullWidth
              disabled={connectStatus === 'PENDING'}
              color="primary"
              variant="contained"
              style={{ height: '40px', fontSize: '14px' }}
              onClick={() => setOpenConnectRequest(true)}
            >
              {connectStatus === 'PENDING'
                ? translate('profile-header.actions.request-sent')
                : translate('profile-header.actions.connect')}
            </Button>
          )}
          {displayMessageButton() && (
            <Button
              fullWidth
              color="primary"
              variant={displayConnectButton() ? 'outlined' : 'contained'}
              style={{ height: '40px', fontSize: '14px' }}
              onClick={redirectToChat}
            >
              {translate('profile-header.actions.message')}
            </Button>
          )}
          {displayThreeDotsButton() && <ThreeDotsButton otherIdentityId={identity?.id || ''} />}
        </div>
      </div>
      <EditImageModal open={openEditAvatar} handleClose={handleCloseEditAvatar} type="avatar" />
      <EditImageModal open={openEditHeader} handleClose={handleCloseEditHeader} type="header" />
      <EditInfoModal open={openEditInfoModal} handleClose={closeEditInfoModal} />
      {identity && <ShareProfile open={openQRCodeModal} handleClose={closeQRCodeModal} identity={identity} />}
      <EditInfoOrgModal open={openEditInfoOrgModal} handleClose={closeEditInfoOrgModal} />
      <ConnectRequestModal
        open={openConnectRequest}
        handleClose={() => setOpenConnectRequest(false)}
        identityId={identity?.id || ''}
      />
    </>
  );
};
