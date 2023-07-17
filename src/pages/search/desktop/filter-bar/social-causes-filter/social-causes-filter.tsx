import { Modal } from 'src/components/templates/modal/modal';
import css from './social-causes-filter.module.scss';
import { Search } from 'src/components/atoms/search/search';
import { CategoriesClickable } from 'src/components/atoms/categories-clickable/categories-clickable';
import { socialCausesToCategoryAdaptor } from 'src/core/adaptors';
import { useState } from 'react';
import { Button } from 'src/components/atoms/button/button';
import { SocialCausesFilterProps } from './social-causes-filter.types';

export const SocialCausesFilter = (props: SocialCausesFilterProps): JSX.Element => {
  const [list, setList] = useState(socialCausesToCategoryAdaptor());
  const [selected, setSelected] = useState(props.value || []);
  const [modalOpen, setModalOpen] = useState(false);

  function onSearch(value: string) {
    const searchResult = socialCausesToCategoryAdaptor().filter((item) =>
      item.label.toLowerCase().includes(value.toLowerCase())
    );
    setList(searchResult);
  }

  function onSubmit() {
    props.onSubmit(selected);
    setModalOpen(false);
  }

  return (
    <div className={css.container} style={{ border: selected.length ? '1px solid var(--color-primary-01)' : '0px' }}>
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
        <span>Social Causes</span>
        <img className={css.chevronDown} src="/icons/arrow-down-black.svg" />
      </div>
    </div>
  );
};
