import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  benefits,
  diversity,
  environmentalImpacts,
  growth,
  socialImpacts,
  transparency,
  workLifeBalance,
} from './contants';
import { ValueAccordion } from '../valueAccordion';

export const ValueContainer = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-1 pb-5 border border-solid border-Gray-light-mode-200 border-x-0 border-t-0">
        <span className="text-Gray-light-mode-900 font-semibold text-lg leading-7">{t('values-h1')}</span>
        <span className="font-normal text-sm leading-5 text-Gray-light-mode-600">{t('values-h2')}</span>
      </div>
      <div className="py-6">
        <ValueAccordion items={workLifeBalance} title={t('Work-life-balance-title')} />
        <ValueAccordion items={benefits} title={t('benefits-title')} />
        <ValueAccordion items={growth} title={t('growth-title')} />
        <ValueAccordion items={diversity} title={t('diversity-title')} />
        <ValueAccordion items={environmentalImpacts} title={t('environmental-impact-title')} />
        <ValueAccordion items={socialImpacts} title={t('social-impact-title')} />
        <ValueAccordion items={transparency} title={t('transparency-title')} />
      </div>
    </div>
  );
};
