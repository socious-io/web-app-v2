import React, { useState, ReactNode, createContext } from 'react';
import { BackLink } from 'src/Nowruz/modules/general/components/BackLink';

import css from './stepper.module.scss';

interface Props {
  components: { Component: ReactNode; skippable: boolean }[];
}
interface ContextValue {
  step: number;
  updateSelectedStep: (newStep: number) => void;
}

export const StepsContext = createContext<ContextValue>({
  step: 0,
  updateSelectedStep: () => {},
});

const Steper: React.FC<Props> = ({ components }) => {
  const [step, setStep] = useState(0);

  const updateSelectedStep = (newStep: number) => {
    setStep(newStep);
  };

  const hasPrevStep = step > 0;

  const handleBack = () => {
    if (hasPrevStep) updateSelectedStep(step - 1);
  };

  return (
    <StepsContext.Provider value={{ step, updateSelectedStep }}>
      {components.map(({ Component }, index) => {
        if (index === step) return <React.Fragment key={index}>{Component}</React.Fragment>;
      })}
      {step !== 0 && (
        <div className="mt-3">
          <BackLink title="Back" onBack={handleBack} block />
        </div>
      )}
    </StepsContext.Provider>
  );
};

export default Steper;
