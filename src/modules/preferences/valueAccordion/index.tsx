import React from 'react';

import { useValueAccordion } from './useValueAccordion';
import { ValueAccordionProps } from './valueAccordion.types';
import Accordion from '../../general/components/Accordion';
import { Checkbox } from '../../general/components/checkbox/checkbox';
import { Input } from '../../general/components/input/input';

export const ValueAccordion: React.FC<ValueAccordionProps> = ({ items, title }) => {
  const { otherChecked, setOtherChecked, description, setDescription, error, handleChangeDesc, letterCount } =
    useValueAccordion();
  return (
    <Accordion title={title} expand={false}>
      <div className="flex flex-col gap-4">
        {items.map(item => (
          <div key={item.title} className="flex gap-3 items-start">
            <Checkbox id={item.title} size="medium" label="" type="checkBox" />
            <div className="flex flex-col gap-0.5">
              <span className="font-medium text-base leading-6 text-Gray-light-mode-700">{item.title}</span>
              <span className="font-normal text-base leading-6 text-Gray-light-mode-600">{item.subtitile}</span>
            </div>
          </div>
        ))}
        <div className="flex gap-3 items-start">
          <Checkbox
            id="other"
            size="medium"
            label=""
            type="checkBox"
            checked={otherChecked}
            onChange={() => setOtherChecked(!otherChecked)}
          />
          <span className="font-medium text-base leading-6 text-Gray-light-mode-700">Other</span>
        </div>
        {otherChecked && (
          <div className="p-6 w-full h-full flex flex-col gap-[6px]">
            <Input
              id="description"
              label="Enter a description..."
              name="description"
              required
              errors={error ? [error] : undefined}
              value={description}
              onChange={handleChangeDesc}
              multiline
              customHeight="94px"
              maxRows={7}
            />
            <div className="text-sm font-normal leading-5 text-Gray-light-mode-600">{`${letterCount}/160`}</div>
          </div>
        )}
      </div>
    </Accordion>
  );
};
