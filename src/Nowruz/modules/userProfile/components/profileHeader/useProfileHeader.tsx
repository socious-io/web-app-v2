import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ConnectStatus, CurrentIdentity, Organization, User, connectionStatus } from 'src/core/api';
import { StepsContext } from 'src/Nowruz/modules/Auth/containers/onboarding/Stepper';
import { RootState } from 'src/store';

export const useProfileHeader = () => {
  const identity = useSelector<RootState, User | Organization | undefined>((state) => {
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

  const [connectStatus, setConnectStatus] = useState<ConnectStatus | undefined>(undefined);
  const [openEditInfoModal, setOpenEditInfoModal] = useState(false);
  const [openEditInfoOrgModal, setOpenEditInfoOrgModal] = useState(false);
  const [openEditAvatar, setOpenEditAvatar] = useState(false);
  const [openEditHeader, setOpenEditHeader] = useState(false);

  const { updateSelectedStep } = useContext(StepsContext);

  useEffect(() => {
    const getConnectionsStatus = async () => {
      if (identity) {
        const res = await connectionStatus(identity.id);
        setConnectStatus(res?.connect?.status);
      }
    };
    getConnectionsStatus();
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
  return {
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
  };
};
