import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ConnectStatus, CurrentIdentity, User, connectionStatus } from 'src/core/api';
import { RootState } from 'src/store';

export const useProfileHeader = () => {
  const user = useSelector<RootState, User | undefined>((state) => {
    return state.profile.user;
  });
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>((state) => {
    return state.identity.entities.find((identity) => identity.current);
  });
  const myProfile = currentIdentity?.id === user?.id;
  const isLoggedIn = !!currentIdentity;

  const [connectStatus, setConnectStatus] = useState<ConnectStatus | undefined>(undefined);
  const [openEditInfoModal, setOpenEditInfoModal] = useState(false);
  const [openEditAvatar, setOpenEditAvatar] = useState(false);
  const [openEditHeader, setOpenEditHeader] = useState(false);

  useEffect(() => {
    const getConnectionsStatus = async () => {
      if (user) {
        const res = await connectionStatus(user.id);
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
    openEditHeader,
    handleOpenEditHeader,
    handleCloseEditHeader,
  };
};
