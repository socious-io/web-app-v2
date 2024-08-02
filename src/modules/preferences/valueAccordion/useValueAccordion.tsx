import { useState } from 'react';

import { ValueAccordionItem } from './valueAccordion.types';

export const useValueAccordion = (items: ValueAccordionItem[], setItems: (value: ValueAccordionItem[]) => void) => {
  const [error, setError] = useState('');
  // const [letterCount, setletterCount] = useState(description.length);

  // const handleChangeDesc = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = event.target.value;
  //   setDescription(value);
  //   setletterCount(value.length);
  //   if (!value) {
  //     setError('required');
  //   } else if (value.length > 160) setError('Too long');
  //   else setError('');
  // };

  const handleChange = (itemKey: string) => {
    const lst = [...items];

    const item = lst.find(item => item.key === itemKey);
    if (!item) return;
    else {
      const newVal = item.value === 'ON' ? 'OFF' : 'ON';
      Object.assign(item, { ...item, value: newVal });
    }

    setItems(lst);
  };
  return { error, handleChange };
};
