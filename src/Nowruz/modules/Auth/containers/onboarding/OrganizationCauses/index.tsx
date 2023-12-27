import { Button } from 'src/Nowruz/modules/general/components/Button';
import MultiSelect from 'src/Nowruz/modules/general/components/multiSelect/multiSelect';
import variables from 'src/components/_exports.module.scss';

import css from './causes.module.scss';
import { useOrganizationCauses } from './useOrganizationCauses';

export const OrganizationCauses = () => {
  const { items, value, setValue, updateSelectedStep } = useOrganizationCauses();
  return (
    <div className="lg:pt-9 sm:pt-4 px-4">
      <div className={css.header}>
        <h1 className={css.title}>What is your organization about?</h1>
        <h2 className={css.description}>Select up to 5 social causes</h2>
      </div>
      <div className="mt-5">
        <MultiSelect
          id={'social-causes'}
          searchTitle={'Select at least 1 cause*'}
          max={5}
          maxLabel={'Max. 5 causes'}
          items={items.slice(0, 30)}
          placeholder={'Search a cause'}
          componentValue={value}
          setComponentValue={setValue}
          customHeight="200px"
          chipBorderColor={variables.color_primary_200}
          chipBgColor={variables.color_primary_50}
          chipFontColor={variables.color_primary_700}
          chipIconColor={variables.color_primary_500}
        />
      </div>
      <div className={`fixed bottom-16 left-0 p-4 pb-0 w-full md:static md:p-0 md:mt-6 ${css.footer} `}>
        <Button disabled={!!!value.length} color="primary" block onClick={() => updateSelectedStep(4)}>
          Next: Logo
        </Button>
      </div>
    </div>
  );
};
