import { forwardRef, useState } from 'react';
import { printWhen } from 'src/core/utils';

import css from './input.module.scss';
import { NewInputProps } from './input.types';

export const NewInput = forwardRef((props: NewInputProps, ref): JSX.Element => {
  const { optional = false, variant = 'outline', register, type, ...rest } = props;
  const [outline, setOutline] = useState(false);
  const { errors } = props;
  const [passwordVisible, setPasswordVisible] = useState(false);

  const eyeJSX = (
    <div
      style={{ opacity: passwordVisible ? '0.3' : '1' }}
      className={css.eye}
      onClick={() => setPasswordVisible(!passwordVisible)}
    >
      <img src="/icons/eye-black.svg" />
    </div>
  );

  const errorsJSX = (
    <div style={{ height: `${errors?.length}rem` }} className={css.errorsContainer}>
      {errors?.length &&
        errors.map((error, i) => (
          <div className={css.errorItem} key={i}>
            <>- {error}</>
          </div>
        ))}
    </div>
  );

  function setClassName(v: NewInputProps['variant']) {
    return v ? css.outline : css.default;
  }

  function setType(type: NewInputProps['type']) {
    if (type === 'password' && passwordVisible) {
      return 'text';
    } else {
      return type;
    }
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
        <div
          className={`${css.textbox} ${props.inputClassName}`}
          style={{ borderColor: outline ? 'var(--color-primary-01)' : '' }}
        >
          <input
            className={css.input}
            id={props.label}
            role="textbox"
            type={setType(props.type)}
            {...rest}
            {...props?.register?.bind(props.name)}
            {...register(props.name)}
          />
          {printWhen(eyeJSX, props.type === 'password')}
        </div>
        {printWhen(errorsJSX, errors && errors.length > 0)}
      </div>
    );
  }

  return (
    <div style={{ gridTemplateRows: '2.5rem' }} className={`${setClassName(variant)} ${props.className}`}>
      <input
        id={props.label}
        className={`${css.textbox} ${css.input} ${props.inputClassName}`}
        role="textbox"
        {...rest}
        {...props?.register?.bind(props.name)}
        {...register(props.name)}
      ></input>
      {printWhen(errorsJSX, errors && errors.length > 0)}
    </div>
  );
});
