import { ChangeEvent } from 'react';
import css from './input.module.scss';
import { InputProps } from './input.types';

export const Input = (props: InputProps): JSX.Element => {
  const {
    label,
    optional = false,
    className,
    errors = [],
    variant,
    onValueChange,
    ...rest
  } = props;

  function onChange(value: ChangeEvent<HTMLInputElement>) {
    const v = value.target.value;
    onValueChange?.(v);
  }

  function setClassName(v: InputProps['variant']) {
    return v ? css.outline : css.default;
  }

  if (label) {
    return (
      <div className={`${setClassName(variant)} ${className}`}>
        <label className={css.label} htmlFor={label}>
          {optional ? (
            <div>
              {label} <span className={css.optionalLabel}>(optional)</span>
            </div>
          ) : (
            label
          )}
        </label>
        <input
          id={label}
          className={css.textbox}
          onChange={onChange}
          role="textbox"
          {...rest}
        ></input>
        <div className={css.errorsContainer}>
          {errors.map((error) => {
            return (
              <div className={css.errorItem} key={error}>
                {error}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div style={{ gridTemplateRows: '2.5rem' }} className={`${setClassName(variant)} ${className}`}>
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
