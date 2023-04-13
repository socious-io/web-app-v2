import css from './radio-group.module.scss';
import { Radio } from '../../atoms/radio/radio';
import { RadioGroupProps } from './radio-group.types';

export const RadioGroup = (props: RadioGroupProps): JSX.Element => {
  return (
    <div className={css.container}>
      <div className={css.label}>{props.label}</div>
      {props.list.map((radio) => {
        return (
          <div key={radio.value} className={css.radioItem}>
            <Radio
              name={props.name}
              onChange={() => props.onChange(radio.value)}
              label={radio.label}
              value={radio.value}
              id={radio.value}
              checked={radio.value === props.value}
            />
          </div>
        );
      })}
    </div>
  );
};
