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
}) => {
  const chipClasses = `${styles.chip} ${theme ? styles[`${theme}-theme`] : ''} ${
    shape === 'round' ? styles.round : styles.sharp
  }`;

  return (
    <div>
      <div className={chipClasses}>
        {startIcon && (
          <div className={styles.startIcon} onClick={onStartIconClick}>
            {startIcon}
          </div>
        )}
        <div className={styles.content}>{label && <div className={styles.label}>{label}</div>}</div>
        {endIcon && (
          <div className={styles.endIcon} onClick={onEndIconClick}>
            {endIcon}
          </div>
        )}
      </div>
    </div>
  );
};
