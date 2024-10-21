import { Button } from 'src/modules/general/components/Button';
import MultiSelect from 'src/modules/general/components/multiSelect/multiSelect';
import variables from 'src/styles/constants/_exports.module.scss';

import css from './skills.module.scss';
import { useSkills } from './useSkills';

export const Skills = () => {
  const { items, value, setValue, updateSelectedStep, translate } = useSkills();
  return (
    <div className="lg:pt-9 sm:pt-4 px-4">
      <div className={css.header}>
        <h1 className={css.title}>{translate('onboarding-user-skills-title')}</h1>
        <h2 className={css.description}>{translate('onboarding-user-skills-subtitle')}</h2>
      </div>
      {!!items?.length && (
        <MultiSelect
          id={'skills'}
          searchTitle={translate('onboarding-user-skills-select-one')}
          max={20}
          maxLabel={translate('onboarding-user-skills-max')}
          items={items}
          placeholder={translate('onboarding-user-skills-search')}
          componentValue={value}
          setComponentValue={setValue}
          customHeight="200px"
          chipFontColor={variables.color_grey_blue_700}
          chipBorderColor={variables.color_grey_200}
          chipBgColor={variables.color_grey_blue_50}
          chipIconColor={variables.color_grey_blue_500}
        />
      )}
      <div className={`fixed bottom-16 left-0 p-4 pb-0 w-full md:static md:p-0 md:mt-6 ${css.footer} `}>
        <Button disabled={!value.length} color="primary" block onClick={() => updateSelectedStep(3)}>
          {translate('onboarding-user-next-location')}
        </Button>
      </div>
    </div>
  );
};
