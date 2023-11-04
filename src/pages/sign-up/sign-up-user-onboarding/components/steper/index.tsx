import React, { useState, ReactNode, createContext } from 'react';

import css from './steper.module.scss';

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
      <div className={css['box']}>
        <div className={css['box__header']}>
          <div className={css['box__back']}>
            {step > 0 && (
              <img
                className={`${css['back']} ${!hasPrevStep && css['back--disabled']}`}
                src="/icons/chevron-left.svg"
                onClick={handleBack}
              />
            )}
          </div>
          <div className={css['box__nav']}>
            <ul className={css['nav']}>
              {components.map((_, index) => {
                return (
                  <li
                    key={index}
                    className={`${css['nav__item']} ${step === index && css['nav__active']}`}
                    // onClick={() => updateSelectedStep(index)} @todo make this optional with props
                  ></li>
                );
              })}
            </ul>
          </div>
          {components[step].skippable ? (
            <div className={css['box__skip']} onClick={() => setStep(step + 1)}>
              Skip
            </div>
          ) : (
            <div className={css['box__skip']} />
          )}
        </div>

        {components.map(({ Component }, index) => {
          if (index === step) return <React.Fragment key={index}>{Component}</React.Fragment>;
        })}
      </div>
    </StepsContext.Provider>
  );
};

export default Steper;
