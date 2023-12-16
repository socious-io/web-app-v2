import { Select as MUISelect, MenuItem, SelectChangeEvent } from '@mui/material';
import React from 'react';

import { SelectProps } from './select.types';

export const Select: React.FC<SelectProps> = ({ options, id, value, setValue }) => {
  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
  };
  return (
    <div className="w-full">
      <MUISelect id={id} value={value} onChange={handleChange} sx={{ height: '44px' }}>
        {options.map((i) => (
          <MenuItem key={i} value={i}>
            {i}
          </MenuItem>
        ))}
      </MUISelect>
    </div>
  );
};
