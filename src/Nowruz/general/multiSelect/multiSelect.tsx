import { Autocomplete, Typography } from '@mui/material';
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
  const { searchTitle, items, maxLabel, max, placeholder, value, setValue } = props;
  const [chipItems, setChipItems] = useState(items);

  function filterItems(val: string) {
    setChipItems(items?.filter((item) => item.label.toLowerCase().includes(val.toLowerCase())));
  }
  function handleChange(val: MultiSelectItem[]) {
    const lastItem = val[val.length - 1];
    const newVal = items?.find((i) => i.label.toLowerCase() === lastItem.label.toLowerCase());
    if (newVal) setValue([...value, newVal]);
    else setChipItems(items?.filter((i) => !value.includes(i)));
  }

  function add(id: string, label: string) {
    if (value.length < (max || 0)) setValue([...value, { id, label }]);
  }

  function remove(val: string) {
    setValue(value.filter((item) => item.label !== val));
  }

  useEffect(() => {
    setChipItems(items?.filter((i) => !value.includes(i)));
  }, [value]);

  return (
    <div className={css.container}>
      <Typography variant="subtitle1">{searchTitle}</Typography>
      <Autocomplete
        value={value}
        onChange={(event, value) => handleChange(value)}
        clearIcon={false}
        options={[]}
        freeSolo
        autoSelect
        multiple
        renderTags={(value, props) =>
          value.map((option, index) => (
            <Chip id={option.id} label={option.label} icon={<RemoveIcon />} {...props({ index })} onClick={remove} />
          ))
        }
        disabled={value.length >= (max || 0)}
        renderInput={(params) => (
          <Input
            placeholder={value.length ? '' : placeholder}
            multiline
            onChange={(e) => filterItems(e.target.value)}
            {...params}
          />
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
      <div className={css.chipContainer}>
        {chipItems?.map((i) => (
          <Chip key={i.id} id={i.id} label={i.label} icon={<AddIcon />} onClick={() => add(i.id, i.label)} />
        ))}
      </div>
    </div>
  );
};

export default MultiSelect;
