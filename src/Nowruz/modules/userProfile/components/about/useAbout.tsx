import { useState } from 'react';
import { useSelector } from 'react-redux';
import { verifyAction } from 'src/Nowruz/modules/refer/referUtils';
import { RootState } from 'src/store';

export const useAbout = () => {
  const identityType = useSelector<RootState, 'users' | 'organizations'>(state => {
    return state.profile.type;
  });
  const [openVerifyModal, setOpenVerifyModal] = useState(false);
  const [connectUrl, setConnectUrl] = useState<string>('');

  const handleOpenVerifyModal = async () => {
    await verifyAction(setConnectUrl, setOpenVerifyModal);
    setOpenVerifyModal(true);
  };

  return { connectUrl, handleOpenVerifyModal, identityType, openVerifyModal, setOpenVerifyModal };
};
