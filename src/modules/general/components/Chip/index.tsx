import React from 'react';

import styles from './index.module.scss';
import { ChipProps } from './index.types';

export const Chip: React.FC<ChipProps> = ({
  label,
  onStartIconClick,
  onEndIconClick,
  startIcon,
  endIcon,
  theme = 'primary',
  shape = 'round',
  size = 'md',
  transparent = false,
  customStyle = '',
}) => {
  const chipClasses = `${styles['chip']} ${styles[`chip--${size}`]} ${
    styles[`chip--${shape}`]
  } ${styles[theme]} ${transparent && styles[`${theme}--transparent`]} ${customStyle}`;

  return (
    <div className={chipClasses}>
      {startIcon && <div onClick={onStartIconClick}>{startIcon}</div>}
      {label}
      {endIcon && <div onClick={onEndIconClick}>{endIcon}</div>}
    </div>
  );
};
