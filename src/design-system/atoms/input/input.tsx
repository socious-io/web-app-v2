import { FormEvent } from 'react';
import css from './input.module.scss';
import { InputProps } from './input.types';

export const Input = (props: InputProps): JSX.Element => {
  const { label, className, variant, onValueChange, ...rest } = props;

  function onChange(value: FormEvent<HTMLInputElement>) {
    const v = (value.target as HTMLInputElement).value;
    onValueChange?.(v);
  }

  function setClassName(v: InputProps['variant']) {
    return v ? css.outline : css.default;
  }

  return (
    <div className={`${setClassName(variant)} ${className}`}>
      <label className={css.label} htmlFor={label}>
        {label}
      </label>
      <input
        id={label}
        className={css.textbox}
        onChange={onChange}
        role="textbox"
        {...rest}
      ></input>
    </div>
  );
};
