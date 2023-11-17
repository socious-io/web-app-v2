import React from 'react';
import Select from 'react-select';

import css from './search-dropdown.module.scss';
import { SearchDropdownProps, Option } from './search-dropdown.types';
import { colourStyles } from './styles';

export const SearchDropdown = ({ placeholder, options, className, label, ...props }) => {
  return (
    <div className={css.container}>
      <label className={css.label}>{label}</label>
      <Select options={options} styles={colourStyles} />
    </div>
  );
};
