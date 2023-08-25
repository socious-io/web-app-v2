import { Modal } from '@templates/modal/modal';
import css from './skills-filter.module.scss';
import { Search } from '@atoms/search/search';
import { CategoriesClickable } from '@atoms/categories-clickable/categories-clickable';
import { skillsToCategoryAdaptor } from 'src/core/adaptors';
import { useState } from 'react';
import { Button } from '@atoms/button/button';
import { SkillsFilterProps } from './skills-filter.types';

const SKILLS = skillsToCategoryAdaptor();

export const SkillsFilter = (props: SkillsFilterProps): JSX.Element => {
  const [list, setList] = useState(SKILLS);
  const [selected, setSelected] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  function onSearch(value: string) {
    const searchResult = SKILLS.filter((item) => item.label.toLowerCase().includes(value.toLowerCase()));
    setList(searchResult);
  }

  function onSubmit() {
    props.onSubmit(selected);
    setModalOpen(false);
  }

  return (
    <div className={css.container} style={{border: selected.length ? '1px solid var(--color-primary-01)' : '0px'}} >
      <Modal height="45rem" maxHeight="70vh" width="400px" open={modalOpen} onClose={() => setModalOpen(false)}>
        <div style={{ height: '45rem', maxHeight: '70vh' }} className={css.body}>
          <div className={css.searchContainer}>
            <Search onValueChange={onSearch} width={'100%'} placeholder="Search" />
          </div>
          <div className={css.categoryContainer}>
            <CategoriesClickable onChange={setSelected} clickable list={list} />
          </div>
          <div className={css.footer}>
            <Button onClick={onSubmit}>Submit</Button>
          </div>
        </div>
      </Modal>
      <div className={css.btn} onClick={() => setModalOpen(true)}>
        <span>Skills</span>
        <img className={css.chevronDown} src="/icons/arrow-down-black.svg" />
      </div>
    </div>
  );
};
