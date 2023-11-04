import React from 'react';

import css from './featued-icon.module.scss';
import { FeaturedIconProps } from './FeaturedIcon.types';

export const FeaturedIcon: React.FC<FeaturedIconProps> = ({ src, className, width, height }) => {
  return (
    <div className={`${css.container} ${className}`}>
      <img src={src} width={width ? width : '28px'} height={height ? height : '28px'} />
    </div>
  );
};
