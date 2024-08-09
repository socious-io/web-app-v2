import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLoaderData } from 'react-router-dom';
import { config } from 'src/config';
import { CurrentIdentity, User, UserMeta } from 'src/core/api';
import { RootState } from 'src/store';
import { useTranslation } from 'react-i18next';

export const useReferCard = (type: 'organization' | 'talent') => {
  const { t } = useTranslation('referral');
  const user = useSelector<RootState, CurrentIdentity | undefined>(state =>
    state.identity.entities.find(identity => identity.current),
  )?.meta as UserMeta;
  const [openEmailModal, setOpenEmailModal] = useState(false);
  const [openSentModal, setOpenSentModal] = useState(false);
  const [emails, setEmails] = useState<string[]>([]);

  const title = type === 'organization' ? t('Ref_refer_organizations_text') : t('Ref_refer_talent_text');
  const url =
    type === 'organization'
      ? `${config.appBaseURL}referral/${user.username}/org`
      : `${config.appBaseURL}referral/${user.username}/talent`;
  const subtitle =
    type === 'organization'
      ? t('Ref_refer_organizations_supporting_text')
      : t('Ref_refer_talent_supporting_text');

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
