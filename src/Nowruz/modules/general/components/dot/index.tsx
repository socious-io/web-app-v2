import React from 'react';

import css from './dot.module.scss';

interface DotProps {
  size: 'small' | 'medium' | 'large';
  color: string;
  shadow: boolean;
  shadowColor?: string;
}
export const Dot: React.FC<DotProps> = (props) => {
  const { size, color, shadow, shadowColor } = props;
  return (
    <div
      className={size === 'small' ? css.small : size === 'medium' ? css.medium : css.large}
      style={{ backgroundColor: color, boxShadow: shadow ? `0px 0px 0px 4px ${shadowColor}` : '' }}
    />
  );
};
