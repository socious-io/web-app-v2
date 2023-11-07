import { useContext, useEffect, useState } from 'react';
import { skillsToCategoryAdaptor } from 'src/core/adaptors';
import { StepsContext } from 'src/Nowruz/modules/Auth/containers/onboarding/Stepper';
import { useUser } from 'src/Nowruz/modules/Auth/contexts/onboarding/sign-up-user-onboarding.context';
export const useSkills = () => {
  const [value, setValue] = useState([]);
  const [items, setItems] = useState([]);
  const { state, updateUser } = useUser();

  const { updateSelectedStep } = useContext(StepsContext);
  useEffect(() => {
    skillsToCategoryAdaptor().then((data) => {
      // const itemsRes = data.map((item) => ({ label: item.label, id: item.value }));
      console.log(data);
      setItems(data);
    });
  }, []);

  useEffect(() => {
    console.log('value', value);
   // updateUser({ ...state, skills: value.map((e) => e.value) });
  }, [value]);

  return { items, value, setValue, updateSelectedStep };
};
