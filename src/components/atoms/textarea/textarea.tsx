import { useState } from 'react';
import css from './textarea.module.scss';
import { TextareaProps } from './textarea.types';

export const Textarea = (props: TextareaProps): JSX.Element => {
  const [outline, setOutline] = useState(false);
  const { optional = false, register, errors = [], variant = 'outline', onValueChange, ...rest } = props;
  //   const registerField = register?.(props.name, { required: !optional, ...props.validations });

  function setClassName(v: TextareaProps['variant']) {
    return v ? css.outline : css.default;
  }

  if (!props.label) {
    return (
      <div
        onFocus={() => setOutline(true)}
        onBlur={() => setOutline(false)}
        className={`${setClassName(variant)} ${css.noLabel}`}
      >
        <textarea
          style={{ borderColor: outline ? 'var(--color-primary-01)' : '' }}
          id={props.label}
          className={css.textbox}
          role="textbox"
          {...rest}
          {...props?.register?.bind(props.name)}
        />
      </div>
    );
  }

  return (
    <div onFocus={() => setOutline(true)} onBlur={() => setOutline(false)} className={setClassName(variant)}>
      <label className={`${css.label} ${props.className}`} htmlFor={props.label}>
        {props.label}
      </label>
      <textarea
        style={{ borderColor: outline ? 'var(--color-primary-01)' : '' }}
        id={props.label}
        className={css.textbox}
        role="textbox"
        {...rest}
        {...props?.register?.bind(props.name)}
      />
    </div>
  );
};
