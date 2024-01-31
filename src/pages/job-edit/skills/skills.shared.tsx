import { useEffect, useState } from 'react';
import { skillsToCategoryAdaptor } from 'src/core/adaptors';
export const useSkillsShared = (oldSelected: string[]) => {
  const [socialCauses, setSocialCauses] = useState<{ value: string; label: string }[]>([]);
  const [skills, setSkills] = useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    skillsToCategoryAdaptor().then((data) => {
      setSocialCauses(data);
      setSkills(data);
    });
  }, []);

  const [selectedSkills, setSelectedSkills] = useState(oldSelected);

  function onSearch(v: string) {
    const filteredValue = skills.filter((item) => item.label.toLowerCase().includes(v.toLowerCase()));
    setSocialCauses(filteredValue);
  }
  const isValid = selectedSkills.length !== null && selectedSkills.length <= 10;

  return { onSearch, socialCauses, selectedSkills, isValid, setSocialCauses, setSelectedSkills };
};
