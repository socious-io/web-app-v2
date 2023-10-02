import { useState } from 'react';
import { useSelector } from 'react-redux';
import { skillsToCategoryAdaptor } from 'src/core/adaptors';
import { RootState } from 'src/store';

export const useSkillsShared = () => {
  const [socialCauses, setSocialCauses] = useState(skillsToCategoryAdaptor());
  const selectedSkills = useSelector<RootState, string[]>((state) => {
    return state.createPostWizard.skills;
  });

  function onSearch(v: string) {
    const filteredValue = skillsToCategoryAdaptor().filter((item) =>
      item.label.toLowerCase().includes(v.toLowerCase()),
    );
    setSocialCauses(filteredValue);
  }

  const isValid = selectedSkills.length > 0 && selectedSkills.length <= 10;

  return { onSearch, socialCauses, selectedSkills, isValid };
};
