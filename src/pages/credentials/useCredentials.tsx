import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { CurrentIdentity, OrgMeta, UserMeta } from 'src/core/api';
import { translate } from 'src/core/utils';
import { CredentialList } from 'src/modules/credentials/credentialsList';
import { IssuedList } from 'src/modules/credentials/issuedList';
import { RootState } from 'src/store';

export const useCredentials = () => {
  const { hash } = useLocation();
  const [hideVerifyBanner, setHideVerifyBanner] = useState(localStorage.getItem('hideVerifiedBanner') === 'true');
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state =>
    state.identity.entities.find(item => item.current),
  );
  const type = currentIdentity?.type;
  const verified =
    type === 'users'
      ? (currentIdentity?.meta as UserMeta).identity_verified
      : (currentIdentity?.meta as OrgMeta)?.verified;

  const verificationStatus = currentIdentity?.verification_status;

  const tabs = [
    { label: translate('cred-issued'), content: <IssuedList /> },
    { label: translate('cred-requested'), content: <CredentialList /> },
    { label: translate('cred-archived'), content: <></> },
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
    hideVerifyBanner,
    handleDismissVerified,
    type,
    activeTabIndex: activeTabIndex[hash] || 0,
    verificationStatus,
  };
};
