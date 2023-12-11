import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import * as React from 'react';

import css from './radio-group.module.scss';
import { RadioGroupProps } from './RadioGroup.types';
export const RadioGrop: React.FC<RadioGroupProps> = ({ row, items, id, name, label }) => {
  return (
    <FormControl>
      <FormLabel id={id}>{label}</FormLabel>
      <RadioGroup row={row} aria-labelledby={label} name={name}>
        {items.map((item) => (
          <FormControlLabel
            value={item.value}
            control={<Radio />}
            label={<span className={css.optionsText}>{item.label}</span>}
            disabled={item.disabled !== undefined ? item.disabled : false}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};
