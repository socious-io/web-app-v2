import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { config } from 'src/config';
import { User } from 'src/core/api';

export const useReferCard = (type: 'organization' | 'talent') => {
  const { userProfile } = useLoaderData() as { userProfile: User };
  const [openEmailModal, setOpenEmailModal] = useState(false);
  const [openSentModal, setOpenSentModal] = useState(false);
  const [emails, setEmails] = useState<string[]>([]);

  const title = type === 'organization' ? 'Refer organizations' : 'Refer talent';
  const url =
    type === 'organization'
      ? `${config.appBaseURL}referral/${userProfile.username}/org`
      : `${config.appBaseURL}referral/${userProfile.username}/talent`;
  const subtitle =
    type === 'organization'
      ? 'Send your link to organizations looking for purpose-driven talent.'
      : 'Send your link to talent looking for jobs and making a difference.';

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
  };

  const sendInviteEmail = () => {
    setOpenEmailModal(false);
    setOpenSentModal(true);
  };
  return {
    openEmailModal,
    setOpenEmailModal,
    handleCopy,
    title,
    subtitle,
    verified: userProfile.identity_verified,
    sendInviteEmail,
    url,
    emails,
    setEmails,
    openSentModal,
    setOpenSentModal,
  };
};
