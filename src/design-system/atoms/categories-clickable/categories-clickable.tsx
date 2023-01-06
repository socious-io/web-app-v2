import { useState } from 'react';
import css from './categories-clickable.module.scss';
import { CategoriesClickableProps } from './categories-clickable.types';

export const CategoriesClickable = (
  props: CategoriesClickableProps
): JSX.Element => {
  const { list, selected = [], onChange, ...rest } = props;
  const [selectedList, setSelectedList] = useState<string[]>(selected);

  function onLabelClick(value: string) {
    const exist = selectedList.includes(value);
    const newList = exist
      ? selectedList.filter((item) => item !== value)
      : [...selectedList, value];
    return () => {
      setSelectedList(newList);
      onChange?.(newList);
    };
  }

  function setSelectedStyle(value: string): string {
    const exist = selectedList.includes(value);
    return exist ? css.active : '';
  }

  return (
    <div style={rest} className={css.container}>
      {list.map(({ value, label }) => (
        <div
          onClick={onLabelClick(value)}
          key={value}
          className={`${css.item} ${setSelectedStyle(value)}`}
        >
          {label}
        </div>
      ))}
    </div>
  );
};
