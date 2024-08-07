import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'src/modules/general/components/Button';

import { useValueContainer } from './useValueContainer';
import { ValueContainerProps, ValueGroup } from './valueContainer.types';
import { ValueAccordion } from '../valueAccordion';

export const ValueContainer: React.FC<ValueContainerProps> = ({ preferences }) => {
  const { t } = useTranslation();
  const { accordionItems, setAccordionItems, accardionGroups, onSave, errors, handleSetError } =
    useValueContainer(preferences);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-1 pb-5 border border-solid border-Gray-light-mode-200 border-x-0 border-t-0">
        <span className="text-Gray-light-mode-900 font-semibold text-lg leading-7">{t('values-h1')}</span>
        <span className="font-normal text-sm leading-5 text-Gray-light-mode-600">{t('values-h2')}</span>
      </div>
      <div className="py-6">
        {accardionGroups.map(item => (
          <ValueAccordion
            key={item.group}
            valueGroup={item.group}
            items={accordionItems}
            title={t(item.title)}
            setItems={setAccordionItems}
            error={errors[item.group]}
            setError={handleSetError}
          />
        ))}
      </div>

      <div className="flex justify-end">
        <Button variant="contained" color="primary" onClick={onSave}>
          Save
        </Button>
      </div>
    </div>
  );
};
