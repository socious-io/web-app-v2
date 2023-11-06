import { TextField, InputAdornment } from '@mui/material';
import { AlertCircle } from 'public/icons/nowruz/alert-circle';
import variables from 'src/components/_exports.module.scss';

import css from './input.module.scss';
import { InputProps } from './input.types';

export const Input: React.FC<InputProps> = ({
  label,
  required,
  errors,
  isValid,
  validMessage,
  prefix,
  color,
  register,
  ...props
}) => {
  const colorStyle = errors ? 'error' : color;

  return (
    <div>
      {label && (
        <div className={css.label}>
          {label}
          {required && '*'}
        </div>
      )}
      <TextField
        variant="outlined"
        focused
        className={`${css.default} ${!colorStyle && css.defaultColor}`}
        fullWidth
        color={colorStyle}
        InputProps={{
          endAdornment: errors && (
            <InputAdornment position="end">
              <AlertCircle width={14} height={14} stroke={`${variables.color_error_600}`} />
            </InputAdornment>
          ),
          startAdornment: prefix && (
            <InputAdornment position="start" className={css.prefix}>
              {prefix}
            </InputAdornment>
          ),
        }}
        {...(register ? register(props.name) : {})}
        {...props}
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
