import React from 'react';

import styles from './Icon.module.scss';

// Use docs/icons-reference.html for icons refrence

export interface IconProps {
  name: string;
  color?: string;
  fontSize?: number;
  className?: string;
  containerClass?: string;
  cursor?: 'pointer' | 'text' | 'default';
  onClick?: (e?: React.MouseEvent<HTMLDivElement>) => void;
}

export const Icon: React.FC<IconProps> = (props) => {
  const { name, color, fontSize, className = '', containerClass, cursor = 'default', onClick } = props;
  const iconStyle = {
    fontSize: `${fontSize}px`,
    color: color,
    cursor: cursor,
  };
  return (
    <div className={`${styles['icon-container']} ${containerClass}`} onClick={onClick}>
      <span className={`icon-${name} ${styles['icon']} ${className}`} style={iconStyle} />
    </div>
  );
};
