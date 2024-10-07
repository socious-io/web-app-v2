import React, { useContext } from 'react';
import { Step } from 'src/modules/Auth/components/Step';
import { Button } from 'src/modules/general/components/Button';
import { Icon } from 'src/modules/general/components/Icon';

import { ImportChoicesProps } from './importChoices.types';
import css from './importCoices.module.scss';
import { useImportChoices } from './useImportCohoices';
import { StepsContext } from '../Stepper';

export const ImportChoices = () => {
  const { updateSelectedStep } = useContext(StepsContext);

  const { steps } = useImportChoices();
  return (
    <div className={css.container}>
      <div className="flex flex-col gap-1">
        <div className={css.title}>First, let’s get to know each other</div>
        <div className={css.subtitle}>Quickly complete your profile by importing your details.</div>
      </div>
      <div className="w-full flex flex-col gap-5 items-center">
        <button className={css.btn}>
          <img src="/icons/nowruz/linkedin.svg" alt="" />
          Import your LinkedIn CV
        </button>
        <div className={css.txt}>
          We&apos;ll create your profile automatically using your LinkedIn CV; you&apos;ll be able to make changes
          later.
        </div>
      </div>
      <div className="w-full flex flex-col">
        <div className={css.boldTxt}>How to setup your profile?</div>
        <div className={css.txt}>It takes a only few steps</div>
      </div>
      <div className="w-full md:max-w-[400px]">
        {steps.map(item => (
          <Step key={item.title} {...item} />
        ))}
      </div>
      <div className="w-full flex flex-col gap-3">
        <div className={css.subtitle}>
          If you don’t have LinkedIn CV or simply would like to create your profile manually click here
        </div>
        <Button variant="text" color="secondary" customStyle="flex gap-2" onClick={() => updateSelectedStep(2)}>
          Fill out manually
          <Icon fontSize={20} name="arrow-right" className="text-Gray-light-mode-600" />
        </Button>
      </div>
    </div>
  );
};
