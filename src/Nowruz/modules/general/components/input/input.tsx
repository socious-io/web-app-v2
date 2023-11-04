import { TextField, InputAdornment, Typography } from '@mui/material';
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
  return (
    <div>
      {label && (
        <div>
          <Typography variant="subtitle1" textAlign="left" className={css.label}>
            {label}
          </Typography>
        </div>
      )}
      <TextField
        {...props}
        variant="outlined"
        focused
        className={`${css.default} ${errors ? css.errorColor : css.defaultColor}`}
        fullWidth
        InputProps={{
          ...props.InputProps,
          style: {
            height: props.customHeight ? props.customHeight : '44px',
          },
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
