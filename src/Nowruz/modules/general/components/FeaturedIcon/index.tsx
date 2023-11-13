import React from 'react';
import { Icon } from 'src/Nowruz/general/Icon';

import css from './featued-icon.module.scss';
import { FeaturedIconProps } from './FeaturedIcon.types';

export const FeaturedIcon: React.FC<FeaturedIconProps> = ({ src, className, width, height, iconName }) => {
  return (
    <div className={`${css.container} ${className}`}>
      {!!src && <img src={src} width={width ? width : '28px'} height={height ? height : '28px'} />}
      {!!iconName && <Icon fontSize={28} name="mail-01" />}
    </div>
  );
};
