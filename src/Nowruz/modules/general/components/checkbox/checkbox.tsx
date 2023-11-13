import { Checkbox as MUICheckbox, Typography } from '@mui/material';
import React from 'react';

import css from './checkbox.module.scss';
import { CheckboxProps } from './checkbox.types';

interface IconProps {
  checked: boolean;
}
const BpCheckedIcon: React.FC<IconProps> = ({ checked }) => {
  return (
    <div className={`${css.icon} ${!checked && css.iconNotChecked} ${checked && css.iconChecked}`}>
      {checked && <img src="/icons/nowruz/checkGreen.svg" alt="" />}
    </div>
  );
};
export const Checkbox: React.FC<CheckboxProps> = ({ label, required, errors, isValid, ...props }) => {
  return (
    <div className={css.container}>
      <div className={css.checkboxContainer}>
        <MUICheckbox
          disableRipple
          color="default"
          checkedIcon={<BpCheckedIcon checked />}
          icon={<BpCheckedIcon checked={false} />}
          sx={{ paddingLeft: '0' }}
          {...props}
        />
      </div>
      <Typography variant="subtitle1" className={css.label}>
        {label}
      </Typography>
    </div>
  );
};
