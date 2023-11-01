import React from 'react';

import css from './stepper.module.scss';

interface StepperIconProps {
  step: number;
  activeStep: number;
  activeColor: string;
  disabledColor: string;
}

export const StepperIconWrapper: React.FC<StepperIconProps & { Component: React.ComponentType }> = ({
  step,
  activeStep,
  activeColor,
  disabledColor,
  Component,
}) => {
  return (
    <div className={css.iconDiv}>
      <Component stroke={step <= activeStep ? activeColor : disabledColor} />
    </div>
  );
};
