import React, { useContext, useState } from 'react';
import { SOCIAL_CAUSES } from 'src/constants/SOCIAL_CAUSES';
import MultiSelect from 'src/Nowruz/general/multiSelect/multiSelect';
import { StepsContext } from 'src/Nowruz/modules/Auth/containers/onboarding/Stepper';
import { Button } from 'src/Nowruz/modules/general/components/Button';

export const Skills = () => {
  const keytems = Object.keys(SOCIAL_CAUSES);
  const [value, setValue] = useState<string[]>([]);
  const { updateSelectedStep } = useContext(StepsContext);

  const items = keytems.map((i) => {
    return SOCIAL_CAUSES[i].label;
  });
  return (
    <>
      What are you passionated about? Select up to 5 social causes
      <MultiSelect
        searchTitle={'Select at least 1 cause*'}
        max={5}
        maxLabel={'Max. 5 causes'}
        items={items.slice(0, 30)}
        placeholder={'search a cause'}
        value={value}
        setValue={setValue}
      />
      <Button color="primary" block onClick={() => updateSelectedStep(2)}>
        Continue
      </Button>
    </>
  );
};
