import { Avatar } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import React, { FunctionComponent } from 'react';

import css from './search-dropdown.module.scss';
import { SearchDropdownProps, Option } from './search-dropdown.types';

// TODO: hardcoded image shall be removed with font icons
// TODO: fix types
// TODO: add start icon
// TODO: fix style for focused

const MyChip = (props) => {
  return (
    <Chip
      {...props}
      className={`${props.className} ${css.chip}`}
      avatar={props.option.avatar ? <Avatar alt="item" src={props.option?.avatar} /> : null}
      label={props.label}
      variant="outlined"
      deleteIcon={<img src="/icons/close.svg" />}
    />
  );
};
export const SearchDropdown = ({ placeholder, options, className, label, ...props }) => {
  return (
    <div className={css.container}>
      <label className={css.label}>{label}</label>
      <Autocomplete<Option>
        options={options}
        className={`${css.autocompelete} ${className}`}
        renderOption={(props, option, state) => {
          return (
            <div
              {...props}
              className={`MuiAutocomplete-option ${css.option} ${state.selected ? css.selectedOption : ''}`}
            >
              <div className={css.optionLabel}>
                {option?.avatar && <Avatar className={css.optionAvatar} src={option?.avatar} />}
                {option.label}
                <span className={css.subtitle}>{option.subtitle}</span>
              </div>
              <div> {state.selected && <img src="/icons/tick.svg" />}</div>
            </div>
          );
        }}
        renderTags={(tagValue, getTagProps) => {
          return tagValue.map((option, index) => (
            <MyChip {...getTagProps({ index })} label={option.label} option={option} />
          ));
        }}
        renderInput={(params) => {
          return <TextField {...params} placeholder={placeholder} variant="outlined" className={css.textfield} />;
        }}
        {...props}
      />
    </div>
  );
};
