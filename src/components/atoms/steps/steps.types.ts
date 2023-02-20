import { CSSProperties } from 'react';

export interface StepsProps extends CSSProperties {
  length: number;
  current: number;
  clickable?: boolean;
  autoPlay?: boolean;
  onStepClick?: (stepNumber: number) => void;
}
