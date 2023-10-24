import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';

import css from './input.module.scss';
import { InputProps } from './input.types';

export const Input = (props: InputProps) => {
  const { id, name, type, label, required, placeHolder, errors, isValid, validMessage, prefix } = props;
  return (
    <div className={css.container}>
      {label && (
        <div className={css.label}>
          {label}
          {required && '*'}
        </div>
      )}
      <div className={css.inputContainer}>
        {prefix ? (
          <div className={css.prefixContainer}>
            <div className={css.prefix}>{prefix}</div>
            <input
              type={type || 'text'}
              id={id}
              name={name}
              placeholder={placeHolder}
              className={`${errors ? css.error : css.normal} ${css.prefixInput} `}
            />
          </div>
        ) : (
          <input
            type={type || 'text'}
            id={id}
            name={name}
            placeholder={placeHolder}
            className={`${errors ? css.error : css.normal} ${css.simpleInput} `}
          />
        )}

        {errors && <ErrorOutlineRoundedIcon className={css.icon} />}
      </div>
      {errors &&
        errors.map((e, index) => (
          <p key={index} className={`${css.errorMsg} ${css.msg}`}>
            {e}
          </p>
        ))}

      {isValid && validMessage && <p className={`${css.successMsg} ${css.msg}`}>{validMessage}</p>}
    </div>
  );
};
