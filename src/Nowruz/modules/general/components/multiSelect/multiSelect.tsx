import { Autocomplete, TextField, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { Icon } from 'src/Nowruz/general/Icon';

import Chip from './chip';
import css from './multiSelect.module.scss';
import { MultiSelectProps } from './multiSelect.types';

const MultiSelect: React.FC<MultiSelectProps> = props => {
  const {
    id,
    searchTitle,
    items,
    maxLabel,
    max,
    placeholder,
    componentValue,
    setComponentValue,
    customHeight,
    chipBorderColor,
    chipBgColor,
    chipFontColor,
    chipIconColor,
    displayDefaultBadges = true,
    errors,
  } = props;
  const [chipItems, setChipItems] = useState(items);
  const [searchVal, setSearchVal] = useState('');
  const inputRef = useRef();

  function filterItems(val: string) {
    setSearchVal(val);
    setChipItems(
      items
        ?.filter(item => !componentValue.map(cv => cv.value).includes(item.value))
        .filter(item => item.label.toLowerCase().startsWith(val.toLowerCase())),
    );
  }

  function handleChange(val: (MultiSelectItem | string)[]) {
    const lastItem = val[val.length - 1];
    const newVal = items?.find(
      i =>
        i.label.toLowerCase() === lastItem.toLowerCase() &&
        !componentValue.map(i => i.label.toLowerCase()).includes(lastItem.toLowerCase()),
    );
    if (newVal) setComponentValue([...componentValue, newVal]);
    else setChipItems(items?.filter(i => !componentValue?.includes(i)));
  }

  function add(value: string, label: string) {
    const existed = componentValue.find(item => item.value === value || item.label === label);
    if (!existed && componentValue?.length < (max || 0)) setComponentValue([...componentValue, { value, label }]);
    inputRef.current.focus();
  }

  function remove(val: string) {
    setComponentValue(componentValue?.filter(item => item.label !== val));
  }

  useEffect(() => {
    setSearchVal('');
    setChipItems(items?.filter(i => !componentValue.map(cv => cv.value).includes(i.value)));
  }, [componentValue]);

  return (
    <div className={css.container}>
      <label htmlFor={id} aria-describedby={id} className={css.searchTitle}>
        {searchTitle}
      </label>
      <Autocomplete
        id={id}
        value={componentValue}
        onChange={(event, value) => handleChange(value)}
        clearIcon={false}
        options={[]}
        freeSolo
        multiple
        renderTags={(value, props) =>
          value.map((option, index) => (
            <Chip
              id={option.value}
              label={option.label}
              icon={<Icon name="x-close" fontSize={12} color={chipIconColor} />}
              {...props({ index })}
              onClick={remove}
              bgColor={chipBgColor}
              borderColor={chipBorderColor}
              fontColor={chipFontColor}
              customStyle="m-[3px]"
            />
          ))
        }
        disabled={componentValue?.length >= (max || 0)}
        onInputChange={(e, newValue) => filterItems(newValue)}
        renderInput={params => {
          return (
            <div className={css.inputContainer}>
              <TextField
                variant="outlined"
                label=""
                placeholder={componentValue?.length ? '' : placeholder}
                onChange={e => filterItems(e.target.value)}
                {...params}
                inputProps={{ ...params.inputProps, value: searchVal, tabIndex: 0 }}
                inputRef={inputRef}
                value={searchVal}
              />
            </div>
          );
        }}
      />
      <div className={css.captionDiv}>
        {errors &&
          errors.map((e, index) => (
            <p key={index} className={`${css.errorMsg}`}>
              {e}
            </p>
          ))}
        <Typography variant="subtitle1" className={css.popularLabel}>
          {maxLabel}
        </Typography>
      </div>

      {displayDefaultBadges && (
        <div className={css.popularDiv}>
          <Typography variant="caption" className={css.popularLabel}>
            Popular
          </Typography>
        </div>
      )}
      {(displayDefaultBadges || searchVal) && (
        <div className={css.chipContainer} style={customHeight ? { height: customHeight, overflowY: 'auto' } : {}}>
          {chipItems?.map(i => (
            <Chip
              key={i.value}
              id={i.value}
              label={i.label}
              icon={<Icon name="plus" fontSize={12} color={chipIconColor} />}
              onClick={() => add(i.value, i.label)}
              bgColor={chipBgColor}
              borderColor={chipBorderColor}
              fontColor={chipFontColor}
              customStyle="m-1"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
