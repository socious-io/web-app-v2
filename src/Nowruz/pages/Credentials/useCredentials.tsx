import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { checkVerification, CurrentIdentity, OrgMeta, requestVerification, UserMeta } from 'src/core/api';
import { CredentialList } from 'src/Nowruz/modules/credentials/credentialsList';
import { IssuedList } from 'src/Nowruz/modules/credentials/issuedList';
import { RootState } from 'src/store';

export const useCredentials = () => {
  const { hash } = useLocation();
  const [hideVerifyBanner, setHideVerifyBanner] = useState(localStorage.getItem('hideVerifiedBanner') === 'true');
  const [openVerifiyAlert, setOpenVerifiyAlert] = useState(false);
  const [connectUrl, setConnectUrl] = useState<string>('');
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state =>
    state.identity.entities.find(item => item.current),
  );
  const type = currentIdentity?.type;

  const [verified, setVerified] = useState(
    type === 'users'
      ? (currentIdentity?.meta as UserMeta).identity_verified
      : (currentIdentity?.meta as OrgMeta)?.verified,
  );
  const tabs = [
    { label: 'Issued', content: <IssuedList /> },
    { label: 'Requested', content: <CredentialList /> },
    { label: 'Archived', content: <></> },
  ];
  const activeTabIndex = {
    '#issued': 0,
    '#requested': 1,
  };

  const handleDismissVerified = () => {
    localStorage.setItem('hideVerifiedBanner', 'true');
    setHideVerifyBanner(true);
  };

  const verifyAction = async () => {
    if (type === 'organizations') {
      setOpenVerifiyAlert(true);
      return;
    }
    const vc = await requestVerification();
    setConnectUrl(vc.connection_url);
    setOpenVerifiyAlert(true);

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
    tabs,
    verified,
    openVerifiyAlert,
    setOpenVerifiyAlert,
    hideVerifyBanner,
    handleDismissVerified,
    type,
    activeTabIndex: activeTabIndex[hash] || 0,
    verifyAction,
    connectUrl,
  };
};
