import React from 'react';

import css from './alertMessage.module.scss';
import { AlertMessageProps } from './alertMessage.types';
import { FeaturedIconOutlined } from '../featuredIconOutlined';

export const AlertMessage: React.FC<AlertMessageProps> = ({ theme, iconName, title, subtitle }) => {
  return (
    <div className={`${css.container} ${css[`container-${theme}`]}`}>
      <FeaturedIconOutlined iconName={iconName} size="md" theme={theme} />
      <div className="flex flex-col gap-1">
        <span className={`${css.title} ${css[`title-${theme}`]}`}>{title}</span>
        <span className={`${css.subtitle} ${css[`title-${theme}`]}`}>{subtitle}</span>
      </div>
    </div>
  );
};
