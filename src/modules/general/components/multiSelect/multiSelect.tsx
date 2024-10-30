import { Autocomplete, TextField, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from 'src/modules/general/components/Icon';

import Chip from './chip';
import css from './multiSelect.module.scss';
import { MultiSelectItem, MultiSelectProps } from './multiSelect.types';

const MultiSelect: React.FC<MultiSelectProps> = ({
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
}) => {
  const { t: translate } = useTranslation();
  const [chipItems, setChipItems] = useState(items);
  const [searchVal, setSearchVal] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>();

  const filterItems = (val: string) => {
    setSearchVal(val);
    setChipItems(
      items
        ?.filter(item => !componentValue.map(cv => cv.value).includes(item.value))
        .filter(item => item.label.toLowerCase().startsWith(val.toLowerCase())),
    );
  };

  const handleChange = (val: (MultiSelectItem | string)[]) => {
    const lastIndx = val.length - 1;
    const lastItem =
      typeof val[lastIndx] === 'string' ? val[lastIndx].toString() : (val[lastIndx] as MultiSelectItem).value;
    const newVal = items?.find(
      item =>
        item.label.toLowerCase() === lastItem.toLowerCase() &&
        !componentValue.map(cv => cv.label.toLowerCase()).includes(lastItem.toLowerCase()),
    );
    if (newVal) setComponentValue([...componentValue, newVal]);
    else setChipItems(items?.filter(item => !componentValue?.includes(item)));
  };

  const add = (value: string, label: string) => {
    const existed = componentValue.find(item => item.value === value || item.label === label);
    if (!existed && componentValue?.length < (max || 0)) setComponentValue([...componentValue, { value, label }]);
    if (inputRef.current) inputRef.current.focus();
  };

  const remove = (val: string) => setComponentValue(componentValue?.filter(item => item.label !== val));

  useEffect(() => {
    setSearchVal('');
    setChipItems(items?.filter(item => !componentValue.map(cv => cv.value).includes(item.value)));
  }, [componentValue]);

  return (
    <div className={css['container']}>
      <label htmlFor={id} aria-describedby={id} className={css['search']}>
        {searchTitle}
      </label>
      <Autocomplete
        id={id}
        value={componentValue}
        onChange={(_, value) => handleChange(value)}
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
              key={option.value}
              onClick={remove}
              bgColor={chipBgColor}
              borderColor={chipBorderColor}
              fontColor={chipFontColor}
              customStyle="m-[3px]"
            />
          ))
        }
        disabled={componentValue?.length >= (max || 0)}
        onInputChange={(_, newValue) => filterItems(newValue)}
        renderInput={params => {
          return (
            <div className={css['input']}>
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
      <div className={css['content']}>
        {(errors || maxLabel) && (
          <div className={css['caption']}>
            {errors &&
              errors.map((error, index) => (
                <p key={index} className={`${css['caption__error']}`}>
                  {error}
                </p>
              ))}
            <Typography variant="subtitle1" className={css['caption__label']}>
              {maxLabel}
            </Typography>
          </div>
        )}

        {displayDefaultBadges && (
          <div className={css['default']}>
            <Typography variant="caption" className={css['default__label']}>
              {translate('general-popular')}
            </Typography>
          </div>
        )}
        {(displayDefaultBadges || searchVal) && (
          <div className={css['chips']} style={customHeight ? { height: customHeight, overflowY: 'auto' } : {}}>
            {chipItems?.map(item => (
              <Chip
                key={item.value}
                id={item.value}
                label={item.label}
                icon={<Icon name="plus" fontSize={12} color={chipIconColor} />}
                onClick={() => add(item.value, item.label)}
                bgColor={chipBgColor}
                borderColor={chipBorderColor}
                fontColor={chipFontColor}
                customStyle="m-1"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiSelect;
