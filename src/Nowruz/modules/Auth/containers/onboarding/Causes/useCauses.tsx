import { useContext, useEffect, useState } from 'react';
import { SOCIAL_CAUSES } from 'src/constants/SOCIAL_CAUSES';
import { StepsContext } from 'src/Nowruz/modules/Auth/containers/onboarding/Stepper';
import { useUser } from 'src/Nowruz/modules/Auth/contexts/onboarding/sign-up-user-onboarding.context';
export const useCauses = () => {
  const keytems = Object.keys(SOCIAL_CAUSES);
  const [value, setValue] = useState([]);
  const { state, updateUser } = useUser();
  const { updateSelectedStep } = useContext(StepsContext);
  useEffect(() => {
    console.log('value', value);
    updateUser({ ...state, causes: value.map((e) => e.value) });
  }, [value]);

  const items = keytems.map((i) => {
    return { id: SOCIAL_CAUSES[i].value, label: SOCIAL_CAUSES[i].label };
  });
  return { items, value, setValue, updateSelectedStep };
};
