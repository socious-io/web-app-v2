import React from 'react';

import styles from './chip.module.scss';
import { ChipProbs } from './Chip.types';

export const Chip: React.FC<ChipProbs> = ({
  label,
  onStartIconClick,
  onEndIconClick,
  startIcon,
  endIcon,
  theme = 'primary',
  shape = 'round',
  size = 'md',
}) => {
  const chipClasses = `${styles[`chip-${size}`]} ${styles[`${theme}-theme`]} ${
    shape === 'round' ? styles.round : styles.sharp
  }`;

  return (
    <div className={chipClasses}>
      {startIcon && <div onClick={onStartIconClick}>{startIcon}</div>}
      {label}
      {endIcon && <div onClick={onEndIconClick}>{endIcon}</div>}
    </div>
  );
};
