import MultiSelect from 'src/Nowruz/general/multiSelect/multiSelect';
import { IntroHeader } from 'src/Nowruz/modules/Auth/components/IntroHeader';
import { Button } from 'src/Nowruz/modules/general/components/Button';

import css from './causes.module.scss';
import { useCauses } from './useCauses';
export const Causes = () => {
  const { items, value, setValue, updateSelectedStep } = useCauses();
  return (
    <div className="lg:pt-9 sm:pt-4 px-4">
      <div className={css.header}>
        <h1 className={css.title}>What are you passionated about?</h1>
        <h2 className={css.description}>Select up to 5 social causes</h2>
      </div>
      <div className="mt-5">
        <MultiSelect
          searchTitle={'Select at least 1 cause*'}
          max={5}
          maxLabel={'Max. 5 causes'}
          items={items}
          placeholder={'Search a cause'}
          componentValue={value}
          setComponentValue={setValue}
          customHeight="200px"
        />
      </div>
      <div className="fixed bottom-16 left-0 p-4 pb-0 w-full md:static md:p-0 md:mt-6 ">
        <Button disabled={!!!value.length} color="primary" block onClick={() => updateSelectedStep(2)}>
          Next: Skills
        </Button>
      </div>
    </div>
  );
};
