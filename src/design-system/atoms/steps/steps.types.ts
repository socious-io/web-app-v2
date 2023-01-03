import { CSSProperties } from 'react';

export interface StepsProps extends CSSProperties {
  length: number;
  current: number;
  autoPlay?: boolean;
  onStepClick?: (stepNumber: number) => void;
}
