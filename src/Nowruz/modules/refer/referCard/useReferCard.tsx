import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLoaderData } from 'react-router-dom';
import { config } from 'src/config';
import { CurrentIdentity, User, UserMeta } from 'src/core/api';
import { RootState } from 'src/store';

export const useReferCard = (type: 'organization' | 'talent') => {
  const user = useSelector<RootState, CurrentIdentity | undefined>(state =>
    state.identity.entities.find(identity => identity.current),
  )?.meta as UserMeta;
  const [openEmailModal, setOpenEmailModal] = useState(false);
  const [openSentModal, setOpenSentModal] = useState(false);
  const [emails, setEmails] = useState<string[]>([]);

  const title = type === 'organization' ? 'Refer organizations' : 'Refer talent';
  const url =
    type === 'organization'
      ? `${config.appBaseURL}referral/${user.username}/org`
      : `${config.appBaseURL}referral/${user.username}/talent`;
  const subtitle =
    type === 'organization'
      ? 'Send your link to organizations looking for purpose-driven talent.'
      : 'Send your link to talent looking for jobs and making a difference.';

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
