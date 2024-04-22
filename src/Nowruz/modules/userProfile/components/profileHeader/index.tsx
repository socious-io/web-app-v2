import { IconButton as MUIIconButton } from '@mui/material';
import variables from 'src/components/_exports.module.scss';
import { Icon } from 'src/Nowruz/general/Icon';
import { ConnectRequestModal } from 'src/Nowruz/modules/connections/connectRequestModal';
import { ThreeDotsButton } from 'src/Nowruz/modules/connections/threeDotsButton';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { EditInfoModal } from 'src/Nowruz/modules/userProfile/containers/editInfo';
import { AlertMessage } from 'src/Nowruz/modules/general/components/alertMessage';
import DesktopHeader from './desktopHeader';
import { MobileHeader } from './mobileHeader';
import css from './profileHeader.module.scss';
import { useProfileHeader } from './useProfileHeader';
import { EditImageModal } from '../../containers/editImage';
import { EditInfoOrgModal } from '../../containers/editInfoOrg';

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
    openEditInfoOrgModal,
    closeEditInfoOrgModal,
    redirectToChat,
    openConnectRequest,
    setOpenConnectRequest,
    displayShareButton,
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
          title="Verify your identity"
          subtitle="In order to access referrals, you need to have a Atala PRISM DID and verify your identity."
        >
          <div className="flex">
            <button
              className="cursor-pointer border-none text-sm leading-5 font-semibold text-Warning-600"
            >
              Learn more
            </button>
            <button
              className="cursor-pointer border-none flex"
            >
              <div className="text-sm leading-5 font-semibold text-Error-700 pl-3 pr-2">Verify now</div>
              <Icon name="arrow-right" fontSize={20} color={variables.color_error_700} />
            </button>
          </div>
        </AlertMessage>
      )}

      <div className={`${css.container} md:mb-12 mb-6`}>
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
          handleMessage={redirectToChat}
          setOpenConnectRequest={setOpenConnectRequest}
          displayShareButton={displayShareButton}
          displayConnectButton={displayConnectButton}
          displayMessageButton={displayMessageButton}
          displayThreeDotsButton={displayThreeDotsButton}
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
            {displayShareButton() && (
              <Button fullWidth color="primary" variant="outlined" customStyle="h-10 text-sm flex gap-1.5 py-0">
                <Icon fontSize={20} name="share-01" color={variables.color_grey_700} />
                Share
              </Button>
            )}
            {displayConnectButton() && (
              <Button
                fullWidth
                disabled={connectStatus === 'PENDING'}
                color="primary"
                variant="contained"
                style={{ height: '40px', fontSize: '14px' }}
                onClick={() => setOpenConnectRequest(true)}
              >
                {connectStatus === 'PENDING' ? 'Request sent' : 'Connect'}
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
                Message
              </Button>
            )}

            {displayThreeDotsButton() && <ThreeDotsButton otherIdentityId={identity?.id || ''} />}
          </div>
        )}
      </div>
      <EditImageModal open={openEditAvatar} handleClose={handleCloseEditAvatar} type="avatar" />
      <EditImageModal open={openEditHeader} handleClose={handleCloseEditHeader} type="header" />
      <EditInfoModal open={openEditInfoModal} handleClose={closeEditInfoModal} />
      <EditInfoOrgModal open={openEditInfoOrgModal} handleClose={closeEditInfoOrgModal} />
      <ConnectRequestModal
        open={openConnectRequest}
        handleClose={() => setOpenConnectRequest(false)}
        identityId={identity?.id || ''}
      />
    </>
  );
};
