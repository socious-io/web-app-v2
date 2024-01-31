import { ReactNode } from 'react';

export interface ChipProbs {
  label: string;
  theme?: 'primary' | 'secondary' | 'grey_blue' | 'error' | 'warning' | 'success';
  shape?: 'round' | 'sharp';
  onStartIconClick?: () => void;
  onEndIconClick?: () => void;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  transparent?: boolean;
}
