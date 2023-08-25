import css from './filter-bar.module.scss';
import { FilterBarTypes } from './filter-bar.types';
import { Popover } from '@atoms/popover/popover';
import { useRef } from 'react';

export const FilterBar = (props: FilterBarTypes): JSX.Element => {
  const menu = [
    { id: 1, label: 'Jobs', cb: console.log },
    { id: 2, label: 'People', cb: console.log },
  ];
  const typeBtnAnchor = useRef<null | HTMLDivElement>(null);

  return (
    <div className={css.container}>
      <div ref={typeBtnAnchor}>TYPE</div>
    </div>
  );
};
