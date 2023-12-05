import { Camera } from '@capacitor/camera';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import async from 'react-select/dist/declarations/src/async/index';
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
  };
};
