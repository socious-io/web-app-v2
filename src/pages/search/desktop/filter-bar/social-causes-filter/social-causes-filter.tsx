import { useEffect, useState } from 'react';
import { Button } from 'src/components/atoms/button/button';
import { CategoriesClickable } from 'src/components/atoms/categories-clickable/categories-clickable';
import { Search } from 'src/components/atoms/search/search';
import { Modal } from 'src/components/templates/modal/modal';
import { socialCausesToCategoryAdaptor } from 'src/core/adaptors';

import css from './social-causes-filter.module.scss';
import { SocialCausesFilterProps } from './social-causes-filter.types';

export const SocialCausesFilter = (props: SocialCausesFilterProps): JSX.Element => {
  const [list, setList] = useState(socialCausesToCategoryAdaptor());
  const [selected, setSelected] = useState(props.selectedCauses);
  function onSearch(value: string) {
    const searchResult = socialCausesToCategoryAdaptor().filter((item) =>
      item.label.toLowerCase().includes(value.toLowerCase()),
    );
    setList(searchResult);
  }

  function onSubmit() {
    const selectedCauses = socialCausesToCategoryAdaptor().filter((cause) => selected.includes(cause.value));
    props.onSubmit(selectedCauses);
    props.onClose();
  }
  useEffect(() => {
    if (!props.open) {
      setSelected(props?.selectedCauses.map((item) => item.value));
    }
  }, [props?.selectedCauses]);
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
            selected={props.selectedCauses.map((item) => item.value)}
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
