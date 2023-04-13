import { CSSProperties } from 'react';
import css from './password-quality.module.scss';
import { validatorsRecord } from './password-quality.services';
import { PasswordQualityProps, Validator } from './password-quality.types';

export const PasswordQuality = (props: PasswordQualityProps): JSX.Element => {
  const { value, validators } = props;

  function setColor(amount: number, name: Validator['name']): CSSProperties {
    const isValid = validatorsRecord[name](value, amount);
    return {
      backgroundColor: isValid ? 'var(--color-success-01)' : '',
    };
  }

  return (
    <div className={css.container}>
      {validators.map(({ amount, name }) => (
        <div key={name}>
          <div style={setColor(amount, name)} className={css.line} />
          <div className={css.validatorName}>
            <li>{`${amount} ${name}`}</li>
          </div>
        </div>
      ))}
    </div>
  );
};
