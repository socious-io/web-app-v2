import { Autocomplete, TextField, Typography } from '@mui/material';
import { Close } from 'public/icons/nowruz/close';
import { Plus } from 'public/icons/nowruz/plus';
import React, { useEffect, useState } from 'react';
import variables from 'src/components/_exports.module.scss';
import { Input } from 'src/Nowruz/modules/general/components/input/input';

import Chip from './chip';
import css from './multiSelect.module.scss';
import { MultiSelectItem, MultiSelectProps } from './multiSelect.types';

const AddIcon: React.FC = () => {
  return <Plus stroke={variables.color_primary_600} width={12} height={12} />;
};

const RemoveIcon: React.FC = () => {
  return <Close stroke={variables.color_primary_600} width={12} height={12} />;
};

const MultiSelect: React.FC<MultiSelectProps> = (props) => {
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
  } = props;
  const [chipItems, setChipItems] = useState(items);

  function filterItems(val: string) {
    setChipItems(
      items
        ?.filter((item) => !componentValue.map((cv) => cv.value).includes(item.value))
        .filter((item) => item.label.toLowerCase().includes(val.toLowerCase())),
    );
  }
  function handleChange(val: MultiSelectItem[]) {
    const lastItem = val[val.length - 1];
    const newVal = items?.find((i) => i.label.toLowerCase() === lastItem.label.toLowerCase());
    if (newVal) setComponentValue([...componentValue, newVal]);
    else setChipItems(items?.filter((i) => !componentValue?.includes(i)));
  }

  function add(value: string, label: string) {
    const existed = componentValue.find((item) => item.value === value || item.label === label);
    if (!existed && componentValue?.length < (max || 0)) setComponentValue([...componentValue, { value, label }]);
  }

  function remove(val: string) {
    setComponentValue(componentValue?.filter((item) => item.label !== val));
  }

  useEffect(() => {
    setChipItems(items?.filter((i) => !componentValue.map((cv) => cv.value).includes(i.value)));
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
        autoSelect
        multiple
        renderTags={(value, props) =>
          value.map((option, index) => (
            <Chip
              id={option.value}
              label={option.label}
              icon={<RemoveIcon />}
              {...props({ index })}
              onClick={remove}
              bgColor={chipBgColor}
              borderColor={chipBorderColor}
              fontColor={chipFontColor}
            />
          ))
        }
        disabled={componentValue?.length >= (max || 0)}
        renderInput={(params) => (
          <div className={css.inputContainer}>
            <TextField
              variant="outlined"
              label=""
              placeholder={componentValue?.length ? '' : placeholder}
              onChange={(e) => filterItems(e.target.value)}
              {...params}
            />
          </div>
        )}
      />
      <div className={css.captionDiv}>
        <Typography variant="subtitle1" className={css.popularLabel}>
          {maxLabel}
        </Typography>
      </div>
      <div className={css.popularDiv}>
        <Typography variant="caption" className={css.popularLabel}>
          Popular
        </Typography>
      </div>
      <div className={css.chipContainer} style={customHeight ? { height: customHeight, overflowY: 'auto' } : {}}>
        {chipItems?.map((i) => (
          <Chip
            key={i.value}
            id={i.value}
            label={i.label}
            icon={<AddIcon />}
            onClick={() => add(i.value, i.label)}
            bgColor={chipBgColor}
            borderColor={chipBorderColor}
            fontColor={chipFontColor}
          />
        ))}
      </div>
    </div>
  );
};

export default MultiSelect;
