import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { skillsToCategoryAdaptor } from 'src/core/adaptors';
import { RootState } from 'src/store';

export const useSkillsShared = () => {
  const [skills, setSkills] = useState<{ value: string; label: string }[]>([]);
  const [socialCauses, setSocialCauses] = useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    skillsToCategoryAdaptor().then((data) => {
      setSkills(data);
      setSocialCauses(data);
    });
  }, []);

  const selectedSkills = useSelector<RootState, string[]>((state) => {
    return state.createPostWizard.skills;
  });

  async function onSearch(v: string) {
    const filteredValue = skills.filter((item) => item.label.toLowerCase().includes(v.toLowerCase()));
    setSocialCauses(filteredValue);
  }

  const isValid = selectedSkills.length > 0 && selectedSkills.length <= 10;

  return { onSearch, socialCauses, selectedSkills, isValid };
};
