import { translate } from 'src/core/utils';
import { Button } from 'src/modules/general/components/Button';
import MultiSelect from 'src/modules/general/components/multiSelect/multiSelect';
import variables from 'src/styles/constants/_exports.module.scss';

import css from './causes.module.scss';
import { useCauses } from './useCauses';
export const Causes = () => {
  const { items, value, setValue, updateSelectedStep } = useCauses();
  return (
    <div className="lg:pt-9 sm:pt-4 px-4">
      <div className={css.header}>
        <h1 className={css.title}>{translate('onboarding-user-cause-title')}</h1>
        <h2 className={css.description}>{translate('onboarding-org-select-cause')}</h2>
      </div>
      <div className="mt-5">
        <MultiSelect
          id={'social-causes'}
          searchTitle={translate('onboarding-org-cause-select-one')}
          max={5}
          maxLabel={translate('onboarding-org-cause-max')}
          items={items}
          placeholder={translate('onboarding-org-cause-search')}
          componentValue={value}
          setComponentValue={setValue}
          customHeight="200px"
          chipBorderColor={variables.color_primary_200}
          chipBgColor={variables.color_primary_50}
          chipFontColor={variables.color_primary_700}
          chipIconColor={variables.color_primary_500}
        />
      </div>
      <div className={`fixed bottom-16 left-0 p-4 pb-0 w-full md:static md:p-0 md:mt-6 ${css.footer}`}>
        <Button disabled={!value.length} color="primary" block onClick={() => updateSelectedStep(2)}>
          {translate('onboarding-user-next-skills')}
        </Button>
      </div>
    </div>
  );
};
