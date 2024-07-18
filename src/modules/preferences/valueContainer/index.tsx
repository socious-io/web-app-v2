import React from 'react';

import { workLifeBalance } from './contants';
import { ValueAccordion } from '../valueAccordion';

export const ValueContainer = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-1 pb-5 border border-solid border-Gray-light-mode-200 border-x-0 border-t-0">
        <span className="text-Gray-light-mode-900 font-semibold text-lg leading-7">Values we uphold </span>
        <span className="font-normal text-sm leading-5 text-Gray-light-mode-600">
          Present the fundamental values and ethical standards central to our organization, helping potential talent
          understand what drives us and ensuring alignment with their personal beliefs and principles.{' '}
        </span>
      </div>
      <div className="py-6">
        <ValueAccordion items={workLifeBalance} title="Work-life balance and employee health" />
      </div>
    </div>
  );
};
