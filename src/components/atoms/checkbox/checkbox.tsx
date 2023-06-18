import css from './checkbox.module.scss';
import { CheckboxProps } from './checkbox.types';

export const Checkbox = ({ checked, id, name, label, onChange, disabled, defaultChecked, register }: CheckboxProps) => {
  return (
    <div className={css.container}>
      <input
        className={css.input}
        type="checkbox"
        id={id}
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        onChange={() => onChange?.(!checked)}
        {...register?.bind(name)}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};
