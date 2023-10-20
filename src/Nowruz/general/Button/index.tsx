import { Button as MaterialButton } from '@mui/material';
import * as React from 'react';

import css from './button.module.scss';
export const Button: React.FC = () => {
  return (
    <MaterialButton className={css.button} variant="contained">
      Sample Button
    </MaterialButton>
  );
};
