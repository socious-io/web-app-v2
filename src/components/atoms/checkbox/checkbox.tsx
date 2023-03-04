import { useState } from 'react';
import css from './checkbox.module.scss';
import { CheckboxProps } from './checkbox.types';

export const Checkbox = ({ checked, id, label, onChange, disabled }: CheckboxProps) => {
  //   const [isChecked, setIsChecked] = useState(checked);

  //   const onChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
  //     setIsChecked(e.currentTarget.checked);
  //   };

  return (
    <div className={css.container}>
      <input type="checkbox" id={id} checked={checked} disabled={disabled} onChange={() => onChange?.(!checked)} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};
