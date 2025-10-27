import { useState } from 'react';
import { User, Organization } from 'src/core/api';
import { getIdentityMeta } from 'src/core/utils';

export const useShareProfile = (handleClose: () => void, identity: User | Organization) => {
  const url = window.location.href;
  const { username, name, profileImage, type } = getIdentityMeta(identity);
  const [copied, setCopied] = useState(false);

  const onCopyClick = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
  };

  const onCloseModal = () => {
    handleClose();
    setCopied(false);
  };

  return {
    data: { url, copied, username, name, profileImage, type },
    operations: { onCopyClick, onCloseModal },
  };
};
