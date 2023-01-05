import { useState } from 'react';
import css from './type-selector.module.scss';
import { TypeSelectorProps } from './type-selector.types';

export const TypeSelector = (props: TypeSelectorProps): JSX.Element => {
  const { list, onChange, ...rest } = props;
  const [value, setValue] = useState<string>('');

  function onSelect(v: string) {
    setValue(v);
    onChange(v);
  }

  return (
    <div style={rest} className={css.container}>
      {list.map((item) => {
        return (
          <div
            className={`${css.item} ${value === item.value ? css.active : ''}`}
            key={item.value}
            onClick={() => onSelect(item.value)}
          >
            {item.label}
            {value === item.value && (
              <img className={css.icon} src="/icons/tick-white.svg" />
            )}
          </div>
        );
      })}
    </div>
  );
};
