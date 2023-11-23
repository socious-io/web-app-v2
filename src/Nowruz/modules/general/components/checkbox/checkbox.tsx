import { FormControlLabel, Checkbox as MUICheckbox } from '@mui/material';
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

export const Checkbox: React.FC<CheckboxProps> = ({ id, label, required, errors, isValid, ...props }) => {
  return (
    <div className={css.container}>
      <div className={css.checkboxContainer}>
        <FormControlLabel
          label={
            <label htmlFor={id} className={css.label} aria-describedby={id}>
              {label}
            </label>
          }
          control={
            <MUICheckbox
              id={id}
              disableRipple
              className={css.default}
              color="default"
              checkedIcon={<BpCheckedIcon checked />}
              icon={<BpCheckedIcon checked={false} />}
              {...props}
            />
          }
        />
      </div>
    </div>
  );
};
