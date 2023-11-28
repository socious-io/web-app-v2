import { FormControlLabel, Checkbox as MUICheckbox } from '@mui/material';
import React from 'react';
import variables from 'src/components/_exports.module.scss';
import { Icon } from 'src/Nowruz/general/Icon';

import css from './checkbox.module.scss';
import { CheckboxProps } from './checkbox.types';

interface IconProps {
  checked: boolean;
  size: 'small' | 'medium';
}
const SquareIcon: React.FC<IconProps> = ({ checked, size }) => {
  return (
    <div
      className={`${size === 'small' ? 'w-4 h-4 ' : 'w-5 h-5 '} ${css.icon} ${!checked && css.iconNotChecked} ${
        checked && css.iconChecked
      }`}
    >
      {checked && <Icon name="check" color={variables.color_primary_600} fontSize={size === 'small' ? 12 : 14} />}
    </div>
  );
};

const CircleIcon: React.FC<IconProps> = ({ checked, size }) => {
  return (
    <div
      className={` rounded-lg flex items-center justify-center ${size === 'small' ? 'w-4 h-4 ' : 'w-5 h-5 '} ${
        !checked && css.circleIconNotChecked
      } ${checked && css.circleIconChecked}`}
    >
      {checked && <Icon name="check" color="white" fontSize={size === 'small' ? 10 : 14} />}
    </div>
  );
};

export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  label,
  required,
  errors,
  onChange,
  isValid,
  type = 'checkBox',
  size = 'small',
  ...props
}) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === ' ') {
      // Simulate a click event when Enter is pressed
      event.preventDefault();
      event.stopPropagation();
      event.target.click();
    }
  };

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
              onKeyDown={handleKeyDown}
              className={css.default}
              color="default"
              checkedIcon={
                type === 'checkBox' ? <SquareIcon checked size={size} /> : <CircleIcon checked size={size} />
              }
              icon={
                type === 'checkBox' ? (
                  <SquareIcon checked={false} size={size} />
                ) : (
                  <CircleIcon checked={false} size={size} />
                )
              }
              {...props}
            />
          }
        />
      </div>
    </div>
  );
};
