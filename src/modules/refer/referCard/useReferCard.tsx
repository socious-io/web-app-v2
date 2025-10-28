import { useState } from 'react';
import { useSelector } from 'react-redux';
import { config } from 'src/config';
import { CurrentIdentity, UserMeta, OrgMeta } from 'src/core/api';
import { translate } from 'src/core/utils';
import { RootState } from 'src/store';

export const useReferCard = (referType: 'organization' | 'talent') => {
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state =>
    state.identity.entities.find(identity => identity.current),
  );
  const userAccount = currentIdentity?.meta as UserMeta;
  const orgAccount = currentIdentity?.meta as OrgMeta;
  const currentIdentityType = currentIdentity?.type;
  const currentIdentityUsername =
    currentIdentityType === 'organizations' ? orgAccount?.shortname : userAccount?.username;
  // const [openEmailModal, setOpenEmailModal] = useState(false);
  const [openSentModal, setOpenSentModal] = useState(false);
  // const [emails, setEmails] = useState<string[]>([]);

  const title = referType === 'organization' ? translate('refer-refer-org') : translate('refer-refer-talent');
  const subtitle = referType === 'organization' ? translate('refer-org-link') : translate('refer-talent-link');
  const url = config.appBaseURL + `referral?referred_by=${currentIdentityUsername}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
  };

  // const sendInviteEmail = async () => {
  //   try {
  //     await sendRefers({ emails });
  //     setEmails([]);
  //     setOpenEmailModal(false);
  //     setOpenSentModal(true);
  //   } catch (e) {
  //     console.log('Error in sending refers:', e);
  //   }
  // };

  return {
    handleCopy,
    title,
    subtitle,
    verified: userAccount?.identity_verified || orgAccount?.verified,
    url,
    openSentModal,
    setOpenSentModal,
  };
};
