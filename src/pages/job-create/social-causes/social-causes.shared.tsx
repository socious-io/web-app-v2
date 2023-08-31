import { useState } from 'react';
import { useSelector } from 'react-redux';
import { skillsToCategoryAdaptor } from 'src/core/adaptors';
import { RootState } from 'src/store/store';

export const useSocialCausesShared = () => {
  const [socialCauses, setSocialCauses] = useState(skillsToCategoryAdaptor);

  const selectedSocialCauses = useSelector<RootState, string[]>((state) => {
    return state.createPostWizard.causes_tags;
  });

  function onSearch(v: string) {
    const filteredValue = skillsToCategoryAdaptor().filter((item) =>
      item.label.toLowerCase().includes(v.toLowerCase())
    );
    setSocialCauses(filteredValue);
  }

  const isValid = selectedSocialCauses?.length > 0 && selectedSocialCauses?.length <= 1;

  return { onSearch, socialCauses, selectedSocialCauses, isValid };
};
