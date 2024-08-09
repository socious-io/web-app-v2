import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { CurrentIdentity, OrgMeta, UserMeta } from 'src/core/api';
import { CredentialList } from 'src/modules/credentials/credentialsList';
import { IssuedList } from 'src/modules/credentials/issuedList';
import { RootState } from 'src/store';
import { useTranslation } from 'react-i18next';

export const useCredentials = () => {
  const { t } = useTranslation('credentials');
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
    { label: t('cred_issued'), content: <IssuedList /> },
    { label: t('cred_requested'), content: <CredentialList /> },
    { label: t('cred_archived'), content: <></> },
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
