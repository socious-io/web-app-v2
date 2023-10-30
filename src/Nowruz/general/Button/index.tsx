
import { Button as MaterialButton } from '@mui/material';
import * as React from 'react';

import css from './button.module.scss';
import { ButtonProps } from './button.types';
export const Button: React.FC<ButtonProps> = ({
  children,
  customStyle,
  color = 'primary',
  variant = 'contained',
  block,
  ...props
}) => {
  const size = block ? css.block : null;

  return (
    <MaterialButton
      className={`${css.default} ${css[color]} ${size} ${customStyle}`}
      color={color}
      variant={variant}
      {...props}
    >
      {children}
    </MaterialButton>
  );
};

