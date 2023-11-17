import MultiSelect from 'src/Nowruz/general/multiSelect/multiSelect';
import { IntroHeader } from 'src/Nowruz/modules/Auth/components/IntroHeader';
import { Button } from 'src/Nowruz/modules/general/components/Button';

import css from './causes.module.scss';
import { useOrganizationCauses } from './useOrganizationCauses';

export const OrganizationCauses = () => {
  const { items, value, setValue, updateSelectedStep } = useOrganizationCauses();
  return (
    <div className="lg:pt-9 sm:pt-4 px-4">
      <div className={css.header}>
        <div className={css.title}>What is your organization about?</div>
        <div className={css.description}>Select up to 5 social causes</div>
      </div>
      <div className="mt-5">
        <MultiSelect
          searchTitle={'Select at least 1 cause*'}
          max={5}
          maxLabel={'Max. 5 causes'}
          items={items.slice(0, 30)}
          placeholder={'Search a cause'}
          componentValue={value}
          setComponentValue={setValue}
          customHeight="200px"
        />
      </div>
      <div className="mt-6 mb-2">
        <Button disabled={!!!value.length} color="primary" block onClick={() => updateSelectedStep(4)}>
          Next: Logo
        </Button>
      </div>
    </div>
  );
};
