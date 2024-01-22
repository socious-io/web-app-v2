import React from 'react';
import { Icon } from 'src/Nowruz/general/Icon';

import css from './featuredIconOutlined.module.scss';
import { FeaturedIconOutlinedProps } from './featuredIconOutlined.type';

export const FeaturedIconOutlined: React.FC<FeaturedIconOutlinedProps> = ({ iconName, size, theme }) => {
  const iconSize = size === 'sm' ? 16 : size === 'md' ? 20 : size === 'lg' ? 24 : 28;
  return (
    <div className={`${css.outline} ${css[`outer-${size}`]} ${css[`${theme}-outer`]} `}>
      <div className={`${css.outline} ${css[`inner-${size}`]} ${css[`${theme}-inner`]} `}>
        <Icon name={iconName} fontSize={iconSize} className={`${css[`icon-color-${theme}`]}`} />
      </div>
    </div>
  );
};
