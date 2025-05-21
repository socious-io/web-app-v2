import { useState } from 'react';
import { useSelector } from 'react-redux';
import { config } from 'src/config';
import { CurrentIdentity, sendRefers, UserMeta, OrgMeta } from 'src/core/api';
import { translate } from 'src/core/utils';
import { RootState } from 'src/store';

export const useReferCard = (referType: 'organization' | 'talent') => {
  const account = useSelector<RootState, CurrentIdentity | undefined>(state =>
    state.identity.entities.find(identity => identity.current),
  )?.meta as UserMeta | OrgMeta;
  const [openEmailModal, setOpenEmailModal] = useState(false);
  const [openSentModal, setOpenSentModal] = useState(false);
  const [emails, setEmails] = useState<string[]>([]);

  const title = referType === 'organization' ? translate('referral-refer-org') : translate('referral-refer-talent');
  const url =
    referType === 'organization'
      ? `${config.appBaseURL}referral/${(account as OrgMeta)?.shortname || (account as UserMeta)?.username}/org`
      : `${config.appBaseURL}referral/${(account as OrgMeta)?.shortname || (account as UserMeta)?.username}/talent`;
  const subtitle = referType === 'organization' ? translate('referral-org-link') : translate('referral-talent-link');

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
  };

  const sendInviteEmail = async () => {
    try {
      await sendRefers({ emails });
      setEmails([]);
      setOpenEmailModal(false);
      setOpenSentModal(true);
    } catch (e) {
      console.log('Error in sending refers:', e);
    }
  };

  return {
    openEmailModal,
    setOpenEmailModal,
    handleCopy,
    title,
    subtitle,
    verified: (account as UserMeta).identity_verified || (account as OrgMeta).verified,
    sendInviteEmail,
    url,
    emails,
    setEmails,
    openSentModal,
    setOpenSentModal,
  };
};
