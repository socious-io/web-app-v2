import React, { useState } from 'react';
import { isTouchDevice } from 'src/core/device-type-detector';

import css from './selectCardGroup.module.scss';
import { SelectCardGroupProps } from './selectCardGroup.type';

export const SelectCardGroup: React.FC<SelectCardGroupProps> = (props) => {
  const { items, value, setValue, width, height } = props;

  const handleClick = (value: string, label: string) => {
    setValue({ value, label });
  };
  const isMobile = isTouchDevice();
  const defaultWidth = isMobile ? '140px' : '210px';
  const defaultHeight = isMobile ? '60px' : '80px';

  return (
    <div className={css.container}>
      {items.map((i) => (
        <div
          key={i.value}
          className={`${css.card} ${value?.value === i.value ? css.cardSelected : ''}`}
          onClick={() => handleClick(i.value, i.label)}
          style={{ width: `${width || defaultWidth}`, height: `${height || defaultHeight}` }}
        >
          {i.label}
        </div>
      ))}
    </div>
  );
};

export default SelectCardGroup;
