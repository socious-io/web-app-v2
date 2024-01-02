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
  fontSize = '12px',
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
        <div className={styles.content}>
          {label && (
            <span className={styles.label} style={{ fontSize }}>
              {label}
            </span>
          )}
        </div>
        {endIcon && (
          <div className={styles.endIcon} onClick={onEndIconClick}>
            {endIcon}
          </div>
        )}
      </div>
    </div>
  );
};
