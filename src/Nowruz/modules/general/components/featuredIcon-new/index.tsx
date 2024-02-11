import React from 'react';
import variables from 'src/components/_exports.module.scss';
import { Icon } from 'src/Nowruz/general/Icon';

import css from './featued-icon.module.scss';
import { FeaturedIconProps } from './FeaturedIcon.types';

export const FeaturedIcon: React.FC<FeaturedIconProps> = ({ type, theme, size, iconName }) => {
  const iconSize = size === 'xs' ? 10 : size === 'sm' ? 16 : size === 'md' ? 20 : size === 'lg' ? 24 : 28;
  let iconColor = variables.color_white;
  if (type === 'light-circle' || type === 'light-circle-outlined') {
    iconColor =
      theme === 'primary'
        ? variables.color_primary_600
        : theme === 'gray'
          ? variables.color_grey_600
          : theme === 'error'
            ? variables.color_error_600
            : theme === 'success'
              ? variables.color_success_600
              : variables.color_warning_600;
  }
  if (type === 'modern') iconColor = variables.color_grey_700;
  return (
    <div
      className={`${css.container} ${css[`container-${size}`]} ${css[type]} ${css[`container-${type}-${theme}`]} ${
        css[`container-${type}-${size}`]
      } ${type === 'modern' ? `${css.modern} ${css[`modern-${size}`]}` : ''}    
      `}
    >
      <Icon name={iconName} fontSize={iconSize} color={iconColor} />
    </div>
  );
};
