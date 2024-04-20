import { useState } from 'react';
import { useSelector } from 'react-redux';
import { checkVerification, requestVerification } from 'src/core/api';
import store, { RootState } from 'src/store';
import { currentIdentities } from 'src/store/thunks/identity.thunks';

export const useAbout = () => {
  const identityType = useSelector<RootState, 'users' | 'organizations'>(state => {
    return state.profile.type;
  });
  const [openVerifyModal, setOpenVerifyModal] = useState(false);
  const [connectUrl, setConnectUrl] = useState<string>('');

  const verifyAction = async () => {
    const vc = await requestVerification();
    setConnectUrl(vc.connection_url);
    setOpenVerifyModal(true);

    /* TODO: as flow may change this is temp solution
          we may call checkVerification method on init depend on Identity verification_status
        */
    const interval = setInterval(async () => {
      const res = await checkVerification();

      if (res.verified) {
        await store.dispatch(currentIdentities());
        clearInterval(interval);
        setOpenVerifyModal(false);
      }
    }, 5000);

    setTimeout(() => {
      clearInterval(interval);
    }, 120000);
  };

  const handleOpenVerifyModal = async () => {
    await verifyAction();
    setOpenVerifyModal(true);
  };

  return { connectUrl, handleOpenVerifyModal, identityType, openVerifyModal, setOpenVerifyModal };
};
