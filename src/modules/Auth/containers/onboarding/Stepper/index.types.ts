import { ReactNode } from 'react';

export interface StepperProps {
  steps: { component: ReactNode; skippable: boolean; back?: boolean }[];
}

export interface ContextValue {
  step: number;
  updateSelectedStep: (newStep: number) => void;
}
