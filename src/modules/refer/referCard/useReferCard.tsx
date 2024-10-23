import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLoaderData } from 'react-router-dom';
import { config } from 'src/config';
import { CurrentIdentity, User, UserMeta } from 'src/core/api';
import { translate } from 'src/core/utils';
import { RootState } from 'src/store';

export const useReferCard = (type: 'organization' | 'talent') => {
  const user = useSelector<RootState, CurrentIdentity | undefined>(state =>
    state.identity.entities.find(identity => identity.current),
  )?.meta as UserMeta;
  const [openEmailModal, setOpenEmailModal] = useState(false);
  const [openSentModal, setOpenSentModal] = useState(false);
  const [emails, setEmails] = useState<string[]>([]);

  const title = type === 'organization' ? translate('referral-refer-org') : translate('referral-refer-talent');
  const url =
    type === 'organization'
      ? `${config.appBaseURL}referral/${user.username}/org`
      : `${config.appBaseURL}referral/${user.username}/talent`;
  const subtitle = type === 'organization' ? translate('referral-org-link') : translate('referral-talent-link');

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
  };

  const sendInviteEmail = () => {
    setEmails([]);
    setOpenEmailModal(false);
    setOpenSentModal(true);
  };
  return {
    openEmailModal,
    setOpenEmailModal,
    handleCopy,
    title,
    subtitle,
    verified: user.identity_verified,
    sendInviteEmail,
    url,
    emails,
    setEmails,
    openSentModal,
    setOpenSentModal,
  };
};
