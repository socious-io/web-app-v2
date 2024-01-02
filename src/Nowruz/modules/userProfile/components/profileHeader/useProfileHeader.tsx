import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ConnectStatus, CurrentIdentity, Organization, User, connectionStatus } from 'src/core/api';
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
  const [openEditAvatar, setOpenEditAvatar] = useState(false);
  const [openEditHeader, setOpenEditHeader] = useState(false);

  useEffect(() => {
    const getConnectionsStatus = async () => {
      if (identity) {
        const res = await connectionStatus(identity.id);
        setConnectStatus(res?.connect?.status);
      }
    };
    getConnectionsStatus();
  }, []);

  const closeEditInfoModal = () => {
    setOpenEditInfoModal(false);
  };
  const handleOpenEditInfoModal = () => {
    setOpenEditInfoModal(true);
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
  };
};
