import { TextField, InputAdornment, Typography } from '@mui/material';
import { AlertCircle } from 'public/icons/nowruz/alert-circle';
import { useEffect, useState } from 'react';
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
  const [showPassword, setShowPassword] = useState(false);
  const [endIcon, setEndIcon] = useState<React.ReactNode>('');
  const [inputType, setInputType] = useState(props.type || 'text');

  useEffect(() => {
    if (errors) setEndIcon(<AlertCircle width={14} height={14} stroke={`${variables.color_error_600}`} />);
    else if (props.type === 'password' && showPassword) {
      setInputType('text');
      setEndIcon(
        <img src="/icons/nowruz/eye-off.svg" onClick={() => setShowPassword(false)} alt="" className={css.iconImg} />,
      );
    } else if (props.type === 'password' && !showPassword) {
      setInputType('password');
      setEndIcon(
        <img src="/icons/nowruz/eye.svg" onClick={() => setShowPassword(true)} alt="" className={css.iconImg} />,
      );
    } else setEndIcon('');
  }, [errors, showPassword]);

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
        variant="outlined"
        focused
        className={`${css.default} ${errors ? css.errorColor : css.defaultColor}`}
        fullWidth
        InputProps={{
          ...props.InputProps,
          style: {
            height: props.customHeight ? props.customHeight : '44px',
          },
          endAdornment: <InputAdornment position="end">{endIcon}</InputAdornment>,
          startAdornment: prefix && (
            <InputAdornment position="start" className={css.prefix}>
              {prefix}
            </InputAdornment>
          ),
        }}
        {...(register ? register(props.name) : {})}
        {...props}
        type={inputType}
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
