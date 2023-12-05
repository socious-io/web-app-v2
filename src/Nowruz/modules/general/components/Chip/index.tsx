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
}) => {
  const getThemeClass = () => {
    if (theme === 'primary') {
      return styles.primary;
    } else if (theme === 'secondary') {
      return styles.secondary;
    } else if (theme === 'success') {
      return styles.success;
    }
  };

  const chipClasses = `${styles.chip} ${getThemeClass()}`;
  return (
    <div className={chipClasses}>
      {startIcon && (
        <div className={styles.icon} onClick={onStartIconClick}>
          {startIcon}
        </div>
      )}
      <div className={styles.content}>
        <div className={styles.label}>{label}</div>
      </div>
      {endIcon && (
        <div className={styles.icon} onClick={onEndIconClick}>
          {endIcon}
        </div>
      )}
    </div>
  );
};
