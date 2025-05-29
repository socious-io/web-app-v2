import { TextField, InputAdornment, IconButton } from '@mui/material';
import { AlertCircle } from 'public/icons/dynamic/alert-circle';
import { useEffect, useState } from 'react';
import { Icon } from 'src/modules/general/components/Icon';
import { InputDropdown } from 'src/modules/general/components/input/InputDropdown';
import variables from 'src/styles/constants/_exports.module.scss';

import css from './input.module.scss';
import { InputProps, Option } from './input.types';

export const Input: React.FC<InputProps> = ({
  id,
  label,
  name,
  errors,
  isValid,
  validMessage,
  prefix,
  register,
  hints,
  startIcon,
  postfix,
  noBorderPostfix = false,
  noBorderPrefix = true,
  postfixDropdown,
  onEnter,
  containerClassName = '',
  multiline = false,
  minRows = 1,
  maxRows = 4,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [endIcon, setEndIcon] = useState<React.ReactNode>('');
  const [inputType, setInputType] = useState(props.type || 'text');
  const [showEyeIcon, setShowEyeIcon] = useState(false);

  useEffect(() => {
    if (errors) setEndIcon(<AlertCircle width={14} height={14} stroke={`${variables.color_error_600}`} />);
    else if (props.type === 'password' && showPassword && showEyeIcon) {
      setInputType('text');
      setEndIcon(
        <IconButton disableRipple className={css.iconBtn} onClick={() => setShowPassword(false)}>
          <Icon name="eye-off" color={variables.color_grey_500} fontSize={24} />
        </IconButton>,
      );
    } else if (props.type === 'password' && !showPassword && showEyeIcon) {
      setInputType('password');
      setEndIcon(
        <IconButton disableRipple className={css.iconBtn} onClick={() => setShowPassword(true)}>
          <Icon name="eye" color={variables.color_grey_500} fontSize={24} />
        </IconButton>,
      );
    } else setEndIcon('');
  }, [errors, showPassword, showEyeIcon]);

  const setValue = (v: string) => {
    let val = v;
    if (props.type !== 'password') {
      val = val.trim();
    }
    if (props.type === 'password')
      if (val.length) setShowEyeIcon(true);
      else setShowEyeIcon(false);
    return val;
  };

  const handleKeydown = (e: React.KeyboardEvent) => {
    const value = (e.target as HTMLInputElement)?.value;
    const isValidValue = !!value.trim();
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!isValidValue) return;
      onEnter?.(value);
    }
  };

  const endAdornmentJSX = (
    <>
      {endIcon && <InputAdornment position="end">{endIcon}</InputAdornment>}
      {postfix && (
        <InputAdornment position="start" className={noBorderPostfix ? css['postfix-no-border'] : css.postfix}>
          {postfix}
        </InputAdornment>
      )}
      {postfixDropdown && (
        <InputDropdown
          options={postfixDropdown.options}
          maxMenuHeight={100}
          onChange={option => postfixDropdown.onChange?.((option as Option).value)}
          value={postfixDropdown.value}
        />
      )}
    </>
  );
  return (
    <div className={containerClassName}>
      {label && (
        <div className={css.labelContainer}>
          <label htmlFor={id} className={css.label} aria-describedby={id}>
            {label}
          </label>
        </div>
      )}

      <TextField
        id={id}
        variant="outlined"
        className={`${css.default} ${errors ? css.errorColor : css.defaultColor}`}
        fullWidth
        onKeyDown={handleKeydown}
        multiline={multiline}
        minRows={minRows}
        maxRows={maxRows}
        InputProps={{
          style: {
            height: props.customHeight ? props.customHeight : '44px',
            alignItems: multiline ? 'flex-start' : 'center',
          },
          endAdornment: endAdornmentJSX,

          startAdornment: prefix ? (
            <InputAdornment position="start" className={noBorderPrefix ? css['prefix-no-border'] : css.prefix}>
              {prefix}
            </InputAdornment>
          ) : startIcon ? (
            <InputAdornment position="start">{startIcon}</InputAdornment>
          ) : (
            ''
          ),
          spellCheck: 'false',
        }}
        {...(register
          ? register(name, {
              setValueAs: setValue,
            })
          : {})}
        {...props}
        type={inputType}
      />
      {errors &&
        errors.map((e, index) => (
          <p key={index} className={`${css.errorMsg} ${css.msg}`}>
            {e}
          </p>
        ))}
      {hints &&
        hints.map((hint, index) => (
          <p key={index} className={`${css.hintMsg} ${css.msg}`}>
            {hint.hide && hint.hint}
          </p>
        ))}
      {isValid && validMessage && <p className={`${css.successMsg} ${css.msg}`}>{validMessage}</p>}
    </div>
  );
};
