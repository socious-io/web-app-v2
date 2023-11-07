import MultiSelect from 'src/Nowruz/general/multiSelect/multiSelect';
import { IntroHeader } from 'src/Nowruz/modules/Auth/components/IntroHeader';
import { Button } from 'src/Nowruz/modules/general/components/Button';

import { useSkills } from './useSkills';

export const Skills = () => {
  const { items, value, setValue, updateSelectedStep } = useSkills();
  console.log('we got items', items);
  return (
    <div className="md:pt-24  px-4">
      <IntroHeader
        title=" What are you passionated about? Select up to 5 social causes"
        description="Select up to 5 social causes"
      />
      {items?.length && (
        <MultiSelect
          searchTitle={'Select at least 1 cause*'}
          max={5}
          maxLabel={'Max. 5 causes'}
          items={items}
          placeholder={'search a cause'}
          value={value}
          setValue={setValue}
        />
      )}
      <div className="mt-6 mb-2">
        <Button color="primary" block onClick={() => updateSelectedStep(4)}>
          Continue
        </Button>
      </div>
    </div>
  );
};
