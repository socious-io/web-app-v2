import { useEffect, useState } from 'react';
import { ValueGroup } from 'src/modules/Preferences/OrgPreferences/valueContainer/valueContainer.types';

import { ValueAccordionItem } from './valueAccordion.types';

export const useValueAccordion = (
  valueGroup: ValueGroup,
  items: ValueAccordionItem[],
  setItems: (value: ValueAccordionItem[]) => void,
  setError: (valueGroup: ValueGroup, error: string) => void,
) => {
  const [letterCount, setLetterCount] = useState(
    items.find(item => item.valueGroup === valueGroup && item.key.includes('OTHERS'))?.description?.length || 0,
  );

  const handleChange = (itemKey: string) => {
    const newList = items.map(item => {
      if (item.key === itemKey) {
        const newVal: 'ON' | 'OFF' = item.value === 'ON' ? 'OFF' : 'ON';
        if (itemKey.includes('OTHERS')) {
          if (newVal === 'OFF') setError(valueGroup, '');
          else if (newVal === 'ON' && !item.description) setError(valueGroup, 'Required');
        }
        return {
          ...item,
          value: newVal,
        };
      }
      return item;
    });

    setItems(newList);
  };

  const handleChangeDesc = (itemKey: string, desc: string) => {
    const newList = items.map(item => {
      if (item.key === itemKey) {
        setLetterCount(desc?.length || 0);
        if (!desc) setError(valueGroup, 'required');
        else if (desc.length > 160) setError(valueGroup, 'Too long');
        else setError(valueGroup, '');
        return { ...item, description: desc };
      }
      return item;
    });
    setItems(newList);
  };

  useEffect(() => {
    setLetterCount(
      items.find(item => item.valueGroup === valueGroup && item.key.includes('OTHERS'))?.description?.length || 0,
    );
  }, [items]);

  return { handleChange, letterCount, handleChangeDesc };
};
