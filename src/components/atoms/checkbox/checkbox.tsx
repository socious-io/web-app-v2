import css from './checkbox.module.scss';
import { CheckboxProps } from './checkbox.types';

export const Checkbox = ({ checked, id, label, onChange, disabled }: CheckboxProps) => {
  return (
    <div className={css.container}>
      <input
        className={css.input}
        type="checkbox"
        id={id}
        checked={checked}
        disabled={disabled}
        onChange={() => onChange?.(!checked)}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};
