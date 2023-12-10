import { ReactNode } from 'react';

export interface ChipProbs {
  label: string;
  theme?: 'primary' | 'secondary';
  shape?: 'round' | 'sharp';
  onStartIconClick?: () => void;
  onEndIconClick?: () => void;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}
