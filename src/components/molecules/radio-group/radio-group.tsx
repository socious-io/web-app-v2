import css from './radio-group.module.scss';
import { Radio } from '@atoms/radio/radio';
import { RadioGroupProps } from './radio-group.types';
import { printWhen } from 'src/core/utils';

export const RadioGroup = (props: RadioGroupProps): JSX.Element => {
  return (
    <div className={`${css.container} ${props.containerClassName}`}>
      {printWhen(<div className={css.label}>{props.label}</div>, !!props.label)}
      {props.list.map((radio) => {
        return (
          <div key={radio.value} className={`${css.radioItem} ${props.className}`}>
            {printWhen(radio.icon, !!radio.icon)}
            <Radio
              name={props.name}
              onChange={() => props.onChange(radio.value, radio.label)}
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
