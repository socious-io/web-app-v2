import { Modal } from 'src/components/templates/modal/modal';
import css from './skills-filter.module.scss';
import { Search } from 'src/components/atoms/search/search';
import { CategoriesClickable } from 'src/components/atoms/categories-clickable/categories-clickable';
import { skillsToCategoryAdaptor } from 'src/core/adaptors';
import { useEffect, useState } from 'react';
import { Button } from 'src/components/atoms/button/button';
import { SkillsFilterProps } from './skills-filter.types';

const SKILLS = skillsToCategoryAdaptor();

export const SkillsFilter = (props: SkillsFilterProps): JSX.Element => {
  const [list, setList] = useState(SKILLS);
  const [selected, setSelected] = useState(props.selectedSkills);

  function onSearch(value: string) {
    const searchResult = SKILLS.filter((item) => item.label.toLowerCase().includes(value.toLowerCase()));
    setList(searchResult);
  }

  function onSubmit() {
    const selectedSkills = SKILLS.filter((skill) => selected.includes(skill.value));
    props.onSubmit(selectedSkills);
    props.onClose();
    setSelected([]);
  }

  return (
    <Modal
      height="45rem"
      maxHeight="70vh"
      width="400px"
      open={props.open}
      onClose={() => {
        props.onClose();
        setSelected([]);
      }}
    >
      <div style={{ height: '45rem', maxHeight: '70vh' }} className={css.body}>
        <div className={css.searchContainer}>
          <Search onValueChange={onSearch} width={'100%'} placeholder="Search" />
        </div>
        <div className={css.categoryContainer}>
          <CategoriesClickable
            selected={selected.map((selected) => selected.label)}
            onChange={setSelected}
            clickable
            list={list}
          />
        </div>
        <div className={css.footer}>
          <Button onClick={onSubmit}>Submit</Button>
        </div>
      </div>
    </Modal>
  );
};
