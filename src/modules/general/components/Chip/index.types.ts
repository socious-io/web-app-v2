import { ReactNode } from 'react';

export interface ChipProps {
  label: string;
  theme?: 'primary' | 'secondary' | 'grey_blue' | 'error' | 'warning' | 'success' | 'grey';
  shape?: 'round' | 'sharp';
  onStartIconClick?: () => void;
  onEndIconClick?: () => void;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  transparent?: boolean;
  customStyle?: string;
}
