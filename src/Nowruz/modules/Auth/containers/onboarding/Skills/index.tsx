import MultiSelect from 'src/Nowruz/general/multiSelect/multiSelect';
import { Button } from 'src/Nowruz/modules/general/components/Button';

import css from './skills.module.scss';
import { useSkills } from './useSkills';
export const Skills = () => {
  const { items, value, setValue, updateSelectedStep } = useSkills();
  return (
    <div className="lg:pt-9 sm:pt-4 px-4">
      <div className={css.header}>
        <div className={css.title}>What skills do you have?</div>
        <div className={css.description}>
          Showcase up to 20 skills you can contribute to help social impact initiatives and organizations
        </div>
      </div>
      {!!items?.length && (
        <MultiSelect
          searchTitle={'Select at least 1 skill*'}
          max={20}
          maxLabel={'Max. 20 skills'}
          items={items}
          placeholder={'Search a skill'}
          componentValue={value}
          setComponentValue={setValue}
          customHeight="200px"
        />
      )}
      <div className="mt-6 mb-2">
        <Button disabled={!!!value.length} color="primary" block onClick={() => updateSelectedStep(3)}>
          Next: Location
        </Button>
      </div>
    </div>
  );
};
