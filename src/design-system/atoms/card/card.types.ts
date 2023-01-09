import { CSSProperties } from 'react';

export interface CardProps extends CSSProperties {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}
