import React from 'react';
import Accordion from 'src/modules/general/components/Accordion';
import { Checkbox } from 'src/modules/general/components/checkbox/checkbox';
import { Input } from 'src/modules/general/components/input/input';

import { useValueAccordion } from './useValueAccordion';
import { ValueAccordionProps } from './valueAccordion.types';

export const ValueAccordion: React.FC<ValueAccordionProps> = ({
  items,
  title,
  setItems,
  valueGroup,
  error,
  setError,
}) => {
  const { handleChange, handleChangeDesc, letterCount } = useValueAccordion(valueGroup, items, setItems, setError);
  return (
    <Accordion title={title} expand={false} hasBorder={false}>
      <div className="flex flex-col gap-4">
        {items
          .filter(item => item.valueGroup === valueGroup)
          .map(item => (
            <div key={item.title} className="flex flex-col gap-4">
              <div className="flex gap-3 items-start">
                <Checkbox
                  id={item.title}
                  checked={item.value === 'ON'}
                  size="medium"
                  label=""
                  type="checkBox"
                  onChange={() => handleChange(item.key)}
                />
                <div className="flex flex-col gap-0.5">
                  <span className="font-medium text-base leading-6 text-Gray-light-mode-700">{item.title}</span>
                  <span className="font-normal text-base leading-6 text-Gray-light-mode-600">{item.subtitle}</span>
                </div>
              </div>
              {item.key.includes('OTHERS') && item.value === 'ON' && (
                <div className="w-full h-full flex flex-col gap-[6px]">
                  <Input
                    id="description"
                    label=""
                    placeholder="Enter a description..."
                    name="description"
                    required
                    errors={error ? [error] : undefined}
                    value={item.description}
                    onChange={e => handleChangeDesc(item.key, e.target.value)}
                    multiline
                    customHeight="94px"
                    maxRows={7}
                  />
                  <div className="text-sm font-normal leading-5 text-Gray-light-mode-600 text-right">{`${letterCount}/160`}</div>
                </div>
              )}
            </div>
          ))}
      </div>
    </Accordion>
  );
};
