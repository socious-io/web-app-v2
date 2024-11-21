import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SOCIAL_CAUSES } from 'src/constants/SOCIAL_CAUSES';
import { StepsContext } from 'src/modules/Auth/containers/onboarding/Stepper';
import { useUser } from 'src/modules/Auth/contexts/onboarding/sign-up-user-onboarding.context';
type SocialCauseValue = {
  label: string;
  value: string;
};

export const useOrganizationCauses = () => {
  const keyItems = Object.keys(SOCIAL_CAUSES);
  const [value, setValue] = useState<SocialCauseValue[]>([]);
  const { state, updateUser } = useUser();
  const { updateSelectedStep } = useContext(StepsContext);
  const { t: translate } = useTranslation();
  const items = keyItems.map(i => {
    return { value: SOCIAL_CAUSES[i].value, label: translate(SOCIAL_CAUSES[i].value) };
  });
  useEffect(() => {
    if (state.social_causes) setValue(getOptionsFromValues(state.social_causes));
  }, []);
  useEffect(() => {
    updateUser({ ...state, social_causes: value.map(e => e.value) });
  }, [value]);

  const getOptionsFromValues = values => values.map(value => SOCIAL_CAUSES[value]);

  return { items, value, setValue, updateSelectedStep };
};
