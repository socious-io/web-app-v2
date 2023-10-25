import { Checkbox as MUICheckbox, FormControlLabel } from '@mui/material';

import { CheckboxProps } from './checkbox.types';
import { useState } from 'react';

export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  name,
  label,
  required,
  errors,
  isValid,
  checked,
  disabled,
  ...props
}) => {
  const [check, setcheck] = useState(checked);
  return (
    <FormControlLabel
      control={
        <MUICheckbox
          id={id}
          name={name}
          checked={check}
          disabled={disabled}
          {...props}
          onChange={() => setcheck(!check)}
          sx={{
            width: '1rem',
            height: '1rem',
            borderRadius: '4px',
            // color: pink[800],
            // '&.Mui-checked': {
            //   color: pink[600],
            // },
          }}
        />
      }
      label={label}
    />
  );
};
