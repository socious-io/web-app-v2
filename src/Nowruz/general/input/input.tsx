import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import { TextField, InputAdornment } from '@mui/material';

import css from './input.module.scss';
import { InputProps } from './input.types';

export const Input = (props: InputProps) => {
  const { id, name, label, required, errors, isValid, validMessage, prefix, color, placeholder } = props;
  const colorStyle = errors ? 'error' : color;

  return (
    <div className={css.container}>
      {label && (
        <div className={css.label}>
          {label}
          {required && '*'}
        </div>
      )}
      <TextField
        id={id}
        name={name}
        variant="outlined"
        color={colorStyle}
        focused
        className={css.default}
        fullWidth
        placeholder={placeholder}
        InputProps={{
          endAdornment: errors && (
            <InputAdornment position="end">
              <ErrorOutlineRoundedIcon className={css.icon} />
            </InputAdornment>
          ),
          startAdornment: prefix && (
            <InputAdornment position="start" className={css.prefix}>
              {prefix}
            </InputAdornment>
          ),
        }}
      />

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
