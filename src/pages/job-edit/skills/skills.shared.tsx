import { useState } from 'react';
import { skillsToCategoryAdaptor } from 'src/core/adaptors';

export const useSkillsShared = (oldSelected: string[]) => {
  const [socialCauses, setSocialCauses] = useState(skillsToCategoryAdaptor());
  const [selectedSkills, setSelectedSkills] = useState(oldSelected);

  function onSearch(v: string) {
    const filteredValue = skillsToCategoryAdaptor().filter((item) =>
      item.label.toLowerCase().includes(v.toLowerCase())
    );
    setSocialCauses(filteredValue);
  }
  const isValid = selectedSkills.length > 0 && selectedSkills.length <= 10;

  return { onSearch, socialCauses, selectedSkills, isValid, setSocialCauses, setSelectedSkills };
};
