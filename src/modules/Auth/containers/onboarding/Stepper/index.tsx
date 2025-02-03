import React, { useState, createContext } from 'react';
import { translate } from 'src/core/utils';
import { BackLink } from 'src/modules/general/components/BackLink';

import styles from './index.module.scss';
import { ContextValue, StepperProps } from './index.types';

export const StepsContext = createContext<ContextValue>({
  step: 0,
  updateSelectedStep: () => {
    return;
  },
});

const Stepper: React.FC<StepperProps> = ({ steps }) => {
  const initialSteps = steps.map(step => ({
    ...step,
    back: step.back ?? true,
  }));
  const [step, setStep] = useState(0);
  const hasPrevStep = step > 0;

  const updateSelectedStep = (newStep: number) => {
    setStep(newStep);
  };

  const handleBack = () => {
    if (hasPrevStep) updateSelectedStep(step - 1);
  };

  return (
    <StepsContext.Provider value={{ step, updateSelectedStep }}>
      {initialSteps.map(({ component }, index) => {
        if (index === step) return <React.Fragment key={index}>{component}</React.Fragment>;
      })}
      {step > 1 && initialSteps[step].back && (
        <div className={styles['back']}>
          <BackLink title={translate('general-back')} block onBack={handleBack} />
        </div>
      )}
    </StepsContext.Provider>
  );
};

export default Stepper;
