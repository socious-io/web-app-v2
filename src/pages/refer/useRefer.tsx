import { useState } from 'react';
import { useSelector } from 'react-redux';
import { CurrentIdentity, OrgMeta, UserMeta } from 'src/core/api';
import { RootState } from 'src/store';

export const useRefer = () => {
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state =>
    state.identity.entities.find(item => item.current),
  );
  const type = currentIdentity?.type;
  const verified =
    type === 'users'
      ? (currentIdentity?.meta as UserMeta).identity_verified
      : (currentIdentity?.meta as OrgMeta)?.verified;
  const verificationStatus = currentIdentity?.verification_status;
  const [hideVerifyBanner, setHideVerifyBanner] = useState(localStorage.getItem('hideVerifiedBanner') === 'true');

  const handleDismissVerified = () => {
    localStorage.setItem('hideVerifiedBanner', 'true');
    setHideVerifyBanner(true);
  };

  return {
    data: {
      type,
      verified,
      verificationStatus,
      hideVerifyBanner,
    },
    operations: {
      handleDismissVerified,
    },
  };
};
