import { useState } from 'react';
import { useSelector } from 'react-redux';
import { CurrentIdentity, checkVerification, requestVerification } from 'src/core/api';
import store, { RootState } from 'src/store';
import { currentIdentities } from 'src/store/thunks/identity.thunks';

export const useTopBannerNotVerified = () => {
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state =>
    state.identity.entities.find(identity => identity.current),
  );
  const type = currentIdentity?.type;
  const [connectUrl, setConnectUrl] = useState('');
  const [openVerifyModal, setOpenVerifyModal] = useState(false);

  const verifyAction = async () => {
    if (type === 'organizations') {
      setOpenVerifyModal(true);
      return;
    }
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

  return { connectUrl, openVerifyModal, setOpenVerifyModal, verifyAction, type };
};
