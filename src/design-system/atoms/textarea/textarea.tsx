import css from './textarea.module.scss';
import { FormEvent } from 'react';
import { TextareaProps } from './textarea.types';

export const Textarea = (props: TextareaProps): JSX.Element => {
  const { optional = false, register, errors = [], variant = 'outline', onValueChange, ...rest } = props;
  //   function onChange(value: FormEvent<HTMLTextAreaElement>) {
  //     const v = (value.target as HTMLTextAreaElement).value;
  //     onValueChange?.(v);
  //   }
  //   const registerField = register?.()
  // {...register?.(props.name, { required: !optional, ...props.validations })}

  function setClassName(v: TextareaProps['variant']) {
    return v ? css.outline : css.default;
  }

  if (!props.label) {
    return (
      <div className={`${setClassName(variant)} ${css.noLabel}`}>
        <textarea
          id={props.label}
          className={css.textbox}
          //   onChange={onChange}
          role="textbox"
          {...rest}
          {...register?.(props.name, { required: !optional, ...props.validations })}
        />
      </div>
    );
  }

  return (
    <div className={setClassName(variant)}>
      <label className={`${css.label} ${props.className}`} htmlFor={props.label}>
        {props.label}
      </label>
      <textarea
        id={props.label}
        className={css.textbox}
        // onChange={onChange}
        role="textbox"
        {...rest}
        {...register?.(props.name, { required: !optional, ...props.validations })}
      />
    </div>
  );
};
