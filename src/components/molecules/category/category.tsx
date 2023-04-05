import { CardSlideUp } from 'src/components/templates/card-slide-up/card-slide-up';
import css from './category.module.scss';
import { CategoryProps } from './category.types';
import { useState } from 'react';
import { printWhen } from 'src/core/utils';
import { CategoriesClickable } from 'src/components/atoms/categories-clickable/categories-clickable';

function translate(selected: string | number, list: CategoryProps['list']): string {
  const translation = list.find((item) => item.value === selected);
  if (!translation?.label) {
    console.warn('Translation does not exist');
    return translation?.value as string;
  }
  return translation.label;
}

export const Category = (props: CategoryProps): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Array<string | number>>(
    (props.register.controls[props.name].value as []) || []
  );

  function onChange(list: string[]) {
    setSelected(list);
    props.register.controls[props.name].setValue(list);
  }

  return (
    <div className={css.container}>
      {printWhen(<div className={css.label}>{props.label}</div>, !!props.label)}
      <div className={css.list} onClick={() => setOpen(true)}>
        {printWhen(<div className={css.placeholder}>{props.placeholder}</div>, selected.length === 0)}
        {selected.map((value) => (
          <div key={value} className={css.item}>
            {translate(value, props.list)}
          </div>
        ))}
      </div>
      <CardSlideUp open={open} onClose={() => setOpen(false)}>
        <div className={css.slideUpContainer}>
          <CategoriesClickable clickable onChange={onChange} selected={selected} list={props.list} />
        </div>
      </CardSlideUp>
    </div>
  );
};
