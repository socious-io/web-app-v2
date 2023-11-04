import { Typography } from '@mui/material';
import React from 'react';

import css from './multiSelect.module.scss';
import { CustomChipProps } from './multiSelect.types';

const Chip: React.FC<CustomChipProps> = (props) => {
  const { label, onClick, icon } = props;

  return (
    <div className={css.chip} onClick={() => onClick(label)}>
      <Typography variant="subtitle1" className={css.chipLabel}>
        {label}
      </Typography>
      {icon}
    </div>
  );
};

export default Chip;
