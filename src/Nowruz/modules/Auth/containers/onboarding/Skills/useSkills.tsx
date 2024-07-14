import { useContext, useEffect, useState } from 'react';
import { skillsToCategoryAdaptor } from 'src/core/adaptors';
import { StepsContext } from 'src/Nowruz/modules/Auth/containers/onboarding/Stepper';
import { useUser } from 'src/Nowruz/modules/Auth/contexts/onboarding/sign-up-user-onboarding.context';
import { MultiSelectItem } from 'src/Nowruz/modules/general/components/multiSelect/multiSelect.types';

interface Option {
  value: string;
  label: string;
}
export const useSkills = () => {
  const [value, setValue] = useState<MultiSelectItem[]>([]);
  const [items, setItems] = useState<Option[]>([]);
  const { state, updateUser } = useUser();

  const { updateSelectedStep } = useContext(StepsContext);
  useEffect(() => {
    skillsToCategoryAdaptor().then(data => {
      setValue(getOptionsFromValues(state.skills || [], data));
      setItems(data);
    });
  }, []);

  useEffect(() => {
    updateUser({ ...state, skills: value.map(e => e.value) });
  }, [value]);
  const getOptionsFromValues = (values, options) => options.filter(option => values.includes(option.value));

  return { items, value, setValue, updateSelectedStep };
};
