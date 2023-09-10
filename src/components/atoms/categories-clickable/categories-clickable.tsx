import { useState } from 'react';
import css from './categories-clickable.module.scss';
import { CategoriesClickableProps } from './categories-clickable.types';

function hasReachedLimit(list: string[], min?: number, max?: number): boolean {
  const minmaxDefined = min !== undefined && max !== undefined;
  const minDefined = min !== undefined && max === undefined;
  const maxDefined = max !== undefined && max === undefined;

  if (minmaxDefined) {
    return list.length <= max && list.length >= min;
  }
  if (minDefined) {
    return list.length >= min;
  }
  if (maxDefined) {
    return list.length <= max;
  }
  return false;
}

export const CategoriesClickable = (props: CategoriesClickableProps): JSX.Element => {
  const { list, clickable = false, selected = [], onChange, ...rest } = props;
  const [selectedList, setSelectedList] = useState<string[]>(selected);

  function onLabelClick(value: string) {
    if (!clickable) {
      return;
    }

    const exist = selectedList.includes(value);
    const newList = exist ? selectedList.filter((item) => item !== value) : [...selectedList, value];
    return () => {
      setSelectedList(newList);
      console.log('list', newList);
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
          style={{ cursor: clickable ? 'pointer' : 'default' }}
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
