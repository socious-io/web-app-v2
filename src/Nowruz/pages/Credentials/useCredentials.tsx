import { useState } from 'react';
import { useSelector } from 'react-redux';
import { CurrentIdentity, OrgMeta } from 'src/core/api';
import { CredentialList } from 'src/Nowruz/modules/credentials/credentialsList';
import { RootState } from 'src/store';

export const useCredentials = () => {
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state =>
    state.identity.entities.find(item => item.current),
  );
  const [hideVerifyBanner, setHideVerifyBanner] = useState(localStorage.getItem('hideVerifiedBanner') === 'true');

  const handleDismissVerified = () => {
    localStorage.setItem('hideVerifiedBanner', 'true');
    setHideVerifyBanner(true);
  };

  const [openVerifiyAlert, setOpenVerifiyAlert] = useState(false);
  const verified = (currentIdentity?.meta as OrgMeta)?.verified;
  const tabs = [{ label: 'Requested', content: <CredentialList /> }];
  return {
    tabs,
    verified,
    openVerifiyAlert,
    setOpenVerifiyAlert,
    hideVerifyBanner,
    handleDismissVerified,
    type: currentIdentity?.type,
  };
};
