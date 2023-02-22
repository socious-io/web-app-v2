import { forwardRef, useState } from 'react';
import { printWhen } from '../../../core/utils';
import css from './input.module.scss';
import { InputProps } from './input.types';

export const Input = forwardRef((props: InputProps, ref): JSX.Element => {
  const { optional = false, variant = 'outline', ...rest } = props;
  const [outline, setOutline] = useState(false);
  const controlErrors = props?.register?.controls[props.name]?.errors || [];
  const isDirty = props.register?.controls[props.name].isDirty;
  const errors = Object.values(controlErrors) as string[];

  const errorsJSX = (
    <div style={{ height: `${errors.length}rem` }} className={css.errorsContainer}>
      {errors.map((error, i) => (
        <div className={css.errorItem} key={i}>
          <>{error}</>
        </div>
      ))}
    </div>
  );

  function setClassName(v: InputProps['variant']) {
    return v ? css.outline : css.default;
  }

  if (props.label) {
    return (
      <div
        onFocus={() => setOutline(true)}
        onBlur={() => setOutline(false)}
        className={`${setClassName(variant)} ${props.className}`}
      >
        <label className={css.label} htmlFor={props.label}>
          {optional ? (
            <div>
              {props.label} <span className={css.optionalLabel}>(optional)</span>
            </div>
          ) : (
            props.label
          )}
        </label>
        <input
          style={{ borderColor: outline ? 'var(--color-primary-01)' : '' }}
          id={props.label}
          className={css.textbox}
          role="textbox"
          {...rest}
          {...props?.register?.bind(props.name)}
        ></input>
        {printWhen(errorsJSX, isDirty)}
      </div>
    );
  }

  return (
    <div style={{ gridTemplateRows: '2.5rem' }} className={`${setClassName(variant)} ${props.className}`}>
      <input
        id={props.label}
        className={css.textbox}
        role="textbox"
        {...rest}
        {...props?.register?.bind(props.name)}
      ></input>
    </div>
  );
});
