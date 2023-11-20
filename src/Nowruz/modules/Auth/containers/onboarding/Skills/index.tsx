import MultiSelect from 'src/Nowruz/general/multiSelect/multiSelect';
import { Button } from 'src/Nowruz/modules/general/components/Button';

import css from './skills.module.scss';
import { useSkills } from './useSkills';
export const Skills = () => {
  const { items, value, setValue, updateSelectedStep } = useSkills();
  console.log('itms', items);
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
      <div className="fixed bottom-16 left-0 p-4 pb-0 w-full md:static md:p-0 md:mt-6 ">
        <Button disabled={!!!value.length} color="primary" block onClick={() => updateSelectedStep(3)}>
          Next: Location
        </Button>
      </div>
    </div>
  );
};
