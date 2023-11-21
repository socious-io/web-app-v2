import React from 'react';

import { ChipListProps } from './chipList.types';
import css from './index.module.scss';

export const ChipList: React.FC<ChipListProps> = (props) => {
  const { items } = props;
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((i) => (
        <div key={i} className={css.chip}>
          {i}
        </div>
      ))}
    </div>
  );
};
