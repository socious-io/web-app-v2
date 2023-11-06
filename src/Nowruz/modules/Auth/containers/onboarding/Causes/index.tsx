import React, { useContext, useState } from 'react';
import { SOCIAL_CAUSES } from 'src/constants/SOCIAL_CAUSES';
import MultiSelect from 'src/Nowruz/general/multiSelect/multiSelect';
import { IntroHeader } from 'src/Nowruz/modules/Auth/components/IntroHeader';
import { StepsContext } from 'src/Nowruz/modules/Auth/containers/onboarding/Stepper';
import { Button } from 'src/Nowruz/modules/general/components/Button';

export const Causes = () => {
  const keytems = Object.keys(SOCIAL_CAUSES);
  const [value, setValue] = useState<string[]>([]);
  const { updateSelectedStep } = useContext(StepsContext);
  const items = keytems.map((i) => {
    return SOCIAL_CAUSES[i].label;
  });
  return (
    <>
      <IntroHeader
        title=" What are you passionated about? Select up to 5 social causes"
        description="Select up to 5 social causes"
      />
      <div className="mt-5">
        <MultiSelect
          searchTitle={'Select at least 1 cause*'}
          max={5}
          maxLabel={'Max. 5 causes'}
          items={items.slice(0, 30)}
          placeholder={'search a cause'}
          value={value}
          setValue={setValue}
        />
      </div>
      <div className="mt-6 mb-2">
        <Button color="primary" block onClick={() => updateSelectedStep(2)}>
          Continue
        </Button>
      </div>
    </>
  );
};
