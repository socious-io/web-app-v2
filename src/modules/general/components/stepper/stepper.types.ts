import { SvgProps } from 'public/icons/dynamic/svg.types';

export interface StepperProps {
  activeStep: number;
  orientation?: 'horizontal' | 'vertical';
  steps: StepInfo[];
}

export type StepInfo = {
  title: string;
  desc: string;
  icon: string;
};
