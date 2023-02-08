import { CSSProperties } from 'react';

export interface ButtonProps extends CSSProperties {
  color?: 'blue' | 'red' | 'white';
  size?: 's' | 'm' | 'l';
  icon?: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}
