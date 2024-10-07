import { Button } from 'src/modules/general/components/Button';
import MultiSelect from 'src/modules/general/components/multiSelect/multiSelect';
import variables from 'src/styles/constants/_exports.module.scss';

import css from './skills.module.scss';
import { useSkills } from './useSkills';

export const Skills = () => {
  const { items, value, setValue, updateSelectedStep } = useSkills();
  return (
    <div className="lg:pt-9 sm:pt-4 px-4">
      <div className={css.header}>
        <h1 className={css.title}>What skills do you have?</h1>
        <h2 className={css.description}>
          Showcase up to 20 skills you can contribute to help social impact initiatives and organizations
        </h2>
      </div>
      {!!items?.length && (
        <MultiSelect
          id={'skills'}
          searchTitle={'Select at least 1 skill*'}
          max={20}
          maxLabel={'Max. 20 skills'}
          items={items}
          placeholder={'Search a skill'}
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
        <Button disabled={!value.length} color="primary" block onClick={() => updateSelectedStep(4)}>
          Next: Location
        </Button>
      </div>
    </div>
  );
};
