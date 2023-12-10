import { IconButton as MUIIconButton } from '@mui/material';
import React from 'react';
import { Icon } from 'src/Nowruz/general/Icon';

import css from './iconButton.module.scss';
import { IconButtonProps } from './iconButton.types';

export const IconButton: React.FC<IconButtonProps> = ({
  size = 'medium',
  iconName,
  iconSize,
  iconColor,
  handleClick,
  customStyle,
  ...props
}) => {
  return (
    <MUIIconButton
      className={`${css.btn} ${
        size === 'small' ? `${css.sm}` : size === 'medium' ? `${css.md}` : `${css.lg}`
      } ${customStyle} `}
      onClick={handleClick}
      {...props}
    >
      <Icon fontSize={iconSize} name={iconName} color={iconColor} />
    </MUIIconButton>
  );
};
