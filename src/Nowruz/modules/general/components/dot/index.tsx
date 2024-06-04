import React from 'react';

import css from './dot.module.scss';

interface DotProps {
  size: 'small' | 'medium' | 'large';
  color: string;
  shadow: boolean;
  shadowColor?: string;
  onClick?: () => void;
}
export const Dot: React.FC<DotProps> = props => {
  const { size, color, shadow, shadowColor, onClick } = props;
  return (
    <div
      className={`${size === 'small' ? css.small : size === 'medium' ? css.medium : css.large} ${
        onClick && 'cursor-pointer'
      }`}
      style={{ backgroundColor: color, boxShadow: shadow ? `0px 0px 0px 4px ${shadowColor}` : '' }}
      onClick={onClick}
    />
  );
};
