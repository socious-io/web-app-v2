import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { CurrentIdentity, UserMeta, checkVerification, requestVerification } from 'src/core/api';
import { useState } from 'react';

export const useRefer = () => {
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state =>
    state.identity.entities.find(identity => identity.current),
  );

  const [openVerifyModal, setOpenVerifyModal] = useState(false);
  const [connectUrl, setConnectUrl] = useState<string>('');
  const [verified, setVerified] = useState((currentIdentity?.meta as UserMeta).identity_verified);

  const verifyAction = async () => {
    const vc = await requestVerification();
    setConnectUrl(vc.connection_url);
    setOpenVerifyModal(true);

    /* TODO: as flow may change this is temp solution
      we may call checkVerification method on init depend on Identity verification_status
    */
    const interval = setInterval(async () => {
      const res = await checkVerification();
      setVerified(res.verified);
      if (verified) clearInterval(interval);
    }, 5000);
  };

  return {
    openVerifyModal,
    setOpenVerifyModal,
    verifyAction,
    verified,
    connectUrl,
  };
};
