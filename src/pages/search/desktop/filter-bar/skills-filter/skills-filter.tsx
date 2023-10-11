import { useEffect, useState } from 'react';
import { Button } from 'src/components/atoms/button/button';
import { CategoriesClickable } from 'src/components/atoms/categories-clickable/categories-clickable';
import { Search } from 'src/components/atoms/search/search';
import { Modal } from 'src/components/templates/modal/modal';
import { skillsToCategoryAdaptor } from 'src/core/adaptors';

import css from './skills-filter.module.scss';
import { SkillsFilterProps } from './skills-filter.types';

export const SkillsFilter = (props: SkillsFilterProps): JSX.Element => {
  const [selected, setSelected] = useState(props.selectedSkills);
  const [list, setList] = useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    skillsToCategoryAdaptor().then((data) => setList(data));
  }, []);

  function onSearch(value: string) {
    const searchResult = list.filter((item) => item.label.toLowerCase().includes(value.toLowerCase()));
    setList(searchResult);
  }

  function onSubmit() {
    const selectedSkills = list.filter((skill) => selected.includes(skill.value));
    props.onSubmit(selectedSkills);
    props.onClose();
  }
  useEffect(() => {
    if (!props.open) {
      setSelected(props?.selectedSkills);
    }
  }, [props?.selectedSkills]);
  return (
    <Modal
      height="45rem"
      maxHeight="70vh"
      width="400px"
      open={props.open}
      onClose={() => {
        props.onClose();
      }}
    >
      <div style={{ height: '45rem', maxHeight: '70vh' }} className={css.body}>
        <div className={css.searchContainer}>
          <Search onValueChange={onSearch} width={'100%'} placeholder="Search" />
        </div>
        <div className={css.categoryContainer}>
          <CategoriesClickable
            selected={props.selectedSkills}
            onChange={(value) => setSelected(value)}
            clickable
            list={list}
            isOpen={props.open}
          />
        </div>
        <div className={css.footer}>
          <Button onClick={onSubmit}>Submit</Button>
        </div>
      </div>
    </Modal>
  );
};
