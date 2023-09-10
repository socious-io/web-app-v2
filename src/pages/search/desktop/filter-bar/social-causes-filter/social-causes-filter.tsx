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

  function onSearch(value: string) {
    const searchResult = socialCausesToCategoryAdaptor().filter((item) =>
      item.label.toLowerCase().includes(value.toLowerCase())
    );
    setList(searchResult);
  }

  function onSubmit() {
    console.log(socialCausesToCategoryAdaptor());
    const selectedCauses = socialCausesToCategoryAdaptor().filter((cause) => selected.includes(cause.value));
    props.onSubmit(selectedCauses);
    props.onClose();
  }

  return (
    <Modal height="45rem" maxHeight="70vh" width="400px" open={props.open} onClose={props.onClose}>
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
  );
};
