import { forwardRef } from 'react';
import { printWhen } from '../../../core/utils';
import css from './input.module.scss';
import { InputProps } from './input.types';

export const Input = forwardRef((props: InputProps, ref): JSX.Element => {
  const { optional = false, variant = 'outline', ...rest } = props;

  const controlErrors = props?.register?.controls[props.name]?.errors || [];
  const isDirty = props.register?.controls[props.name].isDirty;

  const errors = Object.values(controlErrors);

  const errorsJSX = (
    <div className={css.errorsContainer}>
      {errors.map((error, i) => {
        return (
          <div className={css.errorItem} key={i}>
            {error}
          </div>
        );
      })}
    </div>
  );

  function setClassName(v: InputProps['variant']) {
    return v ? css.outline : css.default;
  }

  if (props.label) {
    return (
      <div className={`${setClassName(variant)} ${props.className}`}>
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
