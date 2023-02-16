import css from './textarea.module.scss';
import { FormEvent } from 'react';
import { TextareaProps } from './textarea.types';

export const Textarea = (props: TextareaProps): JSX.Element => {
  const { label, className, variant = 'outline', onValueChange, ...rest } = props;

  function onChange(value: FormEvent<HTMLTextAreaElement>) {
    const v = (value.target as HTMLTextAreaElement).value;
    onValueChange?.(v);
  }

  function setClassName(v: TextareaProps['variant']) {
    return v ? css.outline : css.default;
  }

  if (!label) {
    return (
      <div className={`${setClassName(variant)} ${css.noLabel}`}>
        <textarea id={label} className={css.textbox} onChange={onChange} role="textbox" {...rest} />
      </div>
    );
  }

  return (
    <div className={setClassName(variant)}>
      <label className={`${css.label} ${className}`} htmlFor={label}>
        {label}
      </label>
      <textarea id={label} className={css.textbox} onChange={onChange} role="textbox" {...rest} />
    </div>
  );
};
