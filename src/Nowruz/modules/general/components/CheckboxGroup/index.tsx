import { Checkbox, FormGroup } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import React from 'react';

import css from './index.module.scss';
import { CheckboxGroupProps, Item } from './index.types';

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  items,
  selectedItems,
  id,
  label,
  errors,
  onChange,
  labelClassName = '',
}) => {
  return (
    <FormControl>
      <FormLabel id={id} className={`${css.label} ${labelClassName}`}>
        {label}
      </FormLabel>
      <FormGroup>
        {!!items?.length &&
          items.map((item) => (
            <FormControlLabel
              key={item.label}
              control={
                <Checkbox
                  name={item.label}
                  disabled={!!item.disabled}
                  checked={selectedItems.some((selectedItem) => selectedItem.value === item.value)}
                  onChange={(_, checked: boolean) => {
                    let updatedItems: Item[];
                    if (checked) {
                      updatedItems = [...selectedItems, item];
                    } else {
                      updatedItems = selectedItems.filter((selectedItem) => selectedItem.value !== item.value);
                    }
                    onChange?.(updatedItems);
                  }}
                />
              }
              label={<span className={css.optionsText}>{item.label}</span>}
            />
          ))}
      </FormGroup>
      {errors &&
        errors.map((e: string, index: number) => (
          <p key={index} className={`${css.errorMsg} ${css.msg}`}>
            {e}
          </p>
        ))}
    </FormControl>
  );
};

export default CheckboxGroup;
