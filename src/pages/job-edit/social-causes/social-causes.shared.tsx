import { useState } from 'react';
import { useSelector } from 'react-redux';
import { socialCausesToCategoryAdaptor } from 'src/core/adaptors';

export const useSocialCausesShared = (oldSelected: string[]) => {
  const [socialCauses, setSocialCauses] = useState(socialCausesToCategoryAdaptor());

  const [selectedSocialCauses, setSelectedSocialCauses] = useState(oldSelected);

  function onSearch(v: string) {
    const filteredValue = socialCausesToCategoryAdaptor().filter((item) =>
      item.label.toLowerCase().includes(v.toLowerCase())
    );
    setSocialCauses(filteredValue);
  }

  const isValid = selectedSocialCauses.length > 0 && selectedSocialCauses.length <= 1;

  return { onSearch, socialCauses, selectedSocialCauses, setSelectedSocialCauses, isValid };
};
