import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { CurrentIdentity, OrgMeta } from 'src/core/api';
import { CredentialList } from 'src/Nowruz/modules/credentials/credentialsList';
import { IssuedList } from 'src/Nowruz/modules/credentials/issuedList';
import { RootState } from 'src/store';

export const useCredentials = () => {
  const { hash } = useLocation();
  const [hideVerifyBanner, setHideVerifyBanner] = useState(localStorage.getItem('hideVerifiedBanner') === 'true');
  const [openVerifiyAlert, setOpenVerifiyAlert] = useState(false);
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state =>
    state.identity.entities.find(item => item.current),
  );

  const verified = (currentIdentity?.meta as OrgMeta)?.verified;
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

  return {
    tabs,
    verified,
    openVerifiyAlert,
    setOpenVerifiyAlert,
    hideVerifyBanner,
    handleDismissVerified,
    type: currentIdentity?.type,
    activeTabIndex: activeTabIndex[hash] || 0,
  };
};
