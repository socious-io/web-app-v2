import { useEffect, useState } from 'react';

import { ValueAccordionItem } from './valueAccordion.types';
import { ValueGroup } from '../valueContainer/valueContainer.types';

export const useValueAccordion = (
  valueGroup: ValueGroup,
  items: ValueAccordionItem[],
  setItems: (value: ValueAccordionItem[]) => void,
  setError: (valueGroup: ValueGroup, error: string) => void,
) => {
  const [letterCount, setletterCount] = useState(
    items.find(item => item.valueGroup === valueGroup && item.key.includes('OTHERS'))?.description?.length || 0,
  );

  const handleChange = (itemKey: string) => {
    const lst = [...items];

    const item = lst.find(item => item.key === itemKey);
    if (!item) return;
    else {
      const newVal = item.value === 'ON' ? 'OFF' : 'ON';
      Object.assign(item, { ...item, value: newVal });
      if (itemKey.includes('OTHERS')) {
        if (newVal === 'OFF') setError(valueGroup, '');
        else if (newVal === 'ON' && !item.description) setError(valueGroup, 'Required');
      }
    }

    setItems(lst);
  };

  const handleChangeDesc = (itemKey: string, desc: string) => {
    const lst = [...items];
    const item = lst.find(item => item.key === itemKey);
    if (!item) return;
    else {
      setletterCount(desc?.length || 0);
      if (!desc) setError(valueGroup, 'required');
      else if (desc.length > 160) setError(valueGroup, 'Too long');
      else setError(valueGroup, '');
    }
    Object.assign(item, { ...item, description: desc });
    setItems(lst);
  };

  useEffect(() => {
    setletterCount(
      items.find(item => item.valueGroup === valueGroup && item.key.includes('OTHERS'))?.description?.length || 0,
    );
  }, [items]);

  return { handleChange, letterCount, handleChangeDesc };
};
