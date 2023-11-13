import { useContext, useEffect, useState } from 'react';
import { SOCIAL_CAUSES } from 'src/constants/SOCIAL_CAUSES';
import { StepsContext } from 'src/Nowruz/modules/Auth/containers/onboarding/Stepper';
import { useUser } from 'src/Nowruz/modules/Auth/contexts/onboarding/sign-up-user-onboarding.context';
export const useCauses = () => {
  const keytems = Object.keys(SOCIAL_CAUSES);
  const [value, setValue] = useState([]);
  const { state, updateUser } = useUser();
  const { updateSelectedStep } = useContext(StepsContext);
  const items = keytems.map((i) => {
    return { value: SOCIAL_CAUSES[i].value, label: SOCIAL_CAUSES[i].label };
  });
  useEffect(() => {
    if(state.social_causes)
    setValue(getOptionsFromValues(state.social_causes));
  }, []);
  useEffect(() => {
    updateUser({ ...state, social_causes: value.map((e) => e.value) });
  }, [value]);

  const getOptionsFromValues = (values) => values.map((value) => SOCIAL_CAUSES[value]);

  return { items, value, setValue, updateSelectedStep };
};
