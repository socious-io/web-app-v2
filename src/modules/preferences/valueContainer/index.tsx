import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'src/modules/general/components/Button';

import { useValueContainer } from './useValueContainer';
import { ValueAccordion } from '../valueAccordion';

export const ValueContainer = () => {
  const { t } = useTranslation();
  const { preferences, setPreferences, onSave, errors, handleSetError } = useValueContainer();

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-1 pb-5 border border-solid border-Gray-light-mode-200 border-x-0 border-t-0">
        <span className="text-Gray-light-mode-900 font-semibold text-lg leading-7">{t('values-h1')}</span>
        <span className="font-normal text-sm leading-5 text-Gray-light-mode-600">{t('values-h2')}</span>
      </div>
      <div className="py-6">
        <ValueAccordion
          valueGroup="workLifeBalance"
          items={preferences}
          title={t('Work-life-balance-title')}
          setItems={setPreferences}
          error={errors['workLifeBalance']}
          setError={handleSetError}
        />
        <ValueAccordion
          valueGroup="benefits"
          items={preferences}
          title={t('benefits-title')}
          setItems={setPreferences}
          error={errors['benefits']}
          setError={handleSetError}
        />
        <ValueAccordion
          valueGroup="diversity"
          items={preferences}
          title={t('growth-title')}
          setItems={setPreferences}
          error={errors['diversity']}
          setError={handleSetError}
        />
        <ValueAccordion
          valueGroup="environmentalImpacts"
          items={preferences}
          title={t('diversity-title')}
          setItems={setPreferences}
          error={errors['environmentalImpacts']}
          setError={handleSetError}
        />
        <ValueAccordion
          valueGroup="growth"
          items={preferences}
          title={t('environmental-impact-title')}
          setItems={setPreferences}
          error={errors['growth']}
          setError={handleSetError}
        />
        <ValueAccordion
          valueGroup="socialImpacts"
          items={preferences}
          title={t('social-impact-title')}
          setItems={setPreferences}
          error={errors['socialImpacts']}
          setError={handleSetError}
        />
        <ValueAccordion
          valueGroup="transparency"
          items={preferences}
          title={t('transparency-title')}
          setItems={setPreferences}
          error={errors['transparency']}
          setError={handleSetError}
        />
      </div>
      <Button variant="contained" color="primary" onClick={onSave}>
        Save
      </Button>
    </div>
  );
};
