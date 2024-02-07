import { RadioGroup as RG } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import React, { useState } from 'react';

import css from './radio-group.module.scss';
import { RadioGroupProps } from './RadioGroup.types';
export const RadioGroup: React.FC<RadioGroupProps> = ({
  row,
  items,
  id,
  name,
  label,
  errors,
  onChange,
  defaultValue,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<null | number>();
  return (
    <FormControl>
      <FormLabel id={id}>{label}</FormLabel>
      <RG row={row} aria-labelledby={label} name={name} defaultValue={defaultValue}>
        {items.map((item, index) => (
          <>
            <FormControlLabel
              value={item.value}
              control={<Radio />}
              label={<span className={css.optionsText}>{item.label}</span>}
              disabled={item.disabled !== undefined ? item.disabled : false}
              onClick={() => {
                setSelectedIndex(index);
                onChange && onChange(item);
              }}
              sx={{ width: 'fit-content' }}
            />
            {selectedIndex === index && item.children}
          </>
        ))}
      </RG>
      {errors &&
        errors.map((e, index) => (
          <p key={index} className={`${css.errorMsg} ${css.msg}`}>
            {e}
          </p>
        ))}
    </FormControl>
  );
};
