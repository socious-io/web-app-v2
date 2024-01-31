import { CSSProperties } from 'react';

export interface ButtonProps extends CSSProperties {
  color?: 'blue' | 'red' | 'white' | 'primary';
  size?: 's' | 'm' | 'l';
  icon?: string;
  type?: 'submit' | 'reset' | 'button' | undefined;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}
