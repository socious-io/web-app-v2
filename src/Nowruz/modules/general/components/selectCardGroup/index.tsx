import React, { useEffect } from 'react';

import css from './selectCardGroup.module.scss';
import { SelectCardGroupProps } from './selectCardGroup.type';

export const SelectCardGroup: React.FC<SelectCardGroupProps> = (props) => {
  const { items, value, setValue, defaultValue } = props;
  useEffect(() => {
    if (defaultValue) setValue(defaultValue);
  }, []);
  const handleClick = (value: string, label: string) => {
    setValue({ value, label });
  };

  return (
    <div className={css.container}>
      {items.map((i) => (
        <div
          key={i.value}
          className={`${css.card} ${value?.value === i.value ? css.cardSelected : ''}`}
          onClick={() => handleClick(i.value, i.label)}
        >
          {i.label}
        </div>
      ))}
    </div>
  );
};

export default SelectCardGroup;
