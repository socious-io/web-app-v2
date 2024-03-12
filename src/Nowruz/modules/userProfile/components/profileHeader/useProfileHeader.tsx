import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CurrentIdentity, getReferrer, OrganizationProfile, UserProfile } from 'src/core/api';
import { StepsContext } from 'src/Nowruz/modules/Auth/containers/onboarding/Stepper';
import { RootState } from 'src/store';

export const useProfileHeader = () => {
  const navigate = useNavigate();
  const identity = useSelector<RootState, UserProfile | OrganizationProfile | undefined>((state) => {
    return state.profile.identity;
  });
  const identityType = useSelector<RootState, 'users' | 'organizations'>((state) => {
    return state.profile.type;
  });
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>((state) => {
    return state.identity.entities.find((identity) => identity.current);
  });
  const myProfile = currentIdentity?.id === identity?.id;
  const isLoggedIn = !!currentIdentity;
  const [openEditInfoModal, setOpenEditInfoModal] = useState(false);
  const [openEditInfoOrgModal, setOpenEditInfoOrgModal] = useState(false);
  const [openEditAvatar, setOpenEditAvatar] = useState(false);
  const [openEditHeader, setOpenEditHeader] = useState(false);
  const [openConnectRequest, setOpenConnectRequest] = useState(false);
  const [displayVerifyAlert, setDisplayVerifyAlert] = useState(false);

  const { updateSelectedStep } = useContext(StepsContext);

  useEffect(() => {
    updateSelectedStep(0);
  }, []);

  const closeEditInfoModal = () => {
    setOpenEditInfoModal(false);
  };
  const closeEditInfoOrgModal = () => {
    setOpenEditInfoOrgModal(false);
  };
  const handleOpenEditInfoModal = () => {
    if (identityType === 'users') setOpenEditInfoModal(true);
    else if (identityType === 'organizations') setOpenEditInfoOrgModal(true);
  };

  const handleOpenEditAvatar = async () => {
    setOpenEditAvatar(true);
  };

  const handleCloseEditAvatar = () => {
    setOpenEditAvatar(false);
  };

  const handleOpenEditHeader = async () => {
    setOpenEditHeader(true);
  };

  const handleCloseEditHeader = () => {
    setOpenEditHeader(false);
  };

  const redirectToChat = () => {
    const id = identity?.id;
    navigate(`/chats?participantId=${id}`);
  };

  const displayShareButton = () => {
    if (myProfile || !isLoggedIn) return false;
    if (currentIdentity?.type === 'users') return true;
    if (identityType === 'organizations') return true;
    if (identity?.connection_status === 'CONNECTED') {
      return true;
    }
    return false;
  };

  const displayConnectButton = () => {
    if (myProfile || !isLoggedIn) return false;
    if (!identity?.connection_status || identity?.connection_status === 'PENDING') {
      return true;
    }
    return false;
  };

  const displayMessageButton = () => {
    if (myProfile || !isLoggedIn) return false;
    if (currentIdentity.type === 'users' && identity?.connection_status === 'CONNECTED') return true;
    if (currentIdentity.type === 'organizations') {
      if (identityType === 'users') return true;
      if (identity?.connection_status === 'CONNECTED') return true;
    }
    return false;
  };

  const displayThreeDotsButton = () => {
    if (!myProfile && isLoggedIn) return true;
    return false;
  };

  useEffect(() => {
    const handleDisplayVerifyAlert = async () => {
      if (!isLoggedIn || !myProfile) setDisplayVerifyAlert(false);
  
      let verified;
      if (identityType === 'users')
        verified = (identity as UserProfile).identity_verified
      else
        verified = (identity as OrganizationProfile).verified_impact
      
      if (!verified) {
        const referrer = await getReferrer(identity!.id);
        if (referrer) setDisplayVerifyAlert(true);
      }
      return setDisplayVerifyAlert(false);
    }

    handleDisplayVerifyAlert();
  }, []);

  return {
    identity,
    identityType,
    myProfile,
    isLoggedIn,
    connectStatus: identity?.connection_status,
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
    currentIdentity,
    redirectToChat,
    openConnectRequest,
    setOpenConnectRequest,
    displayShareButton,
    displayConnectButton,
    displayMessageButton,
    displayThreeDotsButton,
    displayVerifyAlert,
  };
};
