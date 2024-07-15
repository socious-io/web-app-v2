import React from 'react';

import { BadgeProps } from './badge.types';
import css from './index.module.scss';

const Badge: React.FC<BadgeProps> = ({ content }) => {
  return <div className={css.content}>{content}</div>;
};

export default Badge;
