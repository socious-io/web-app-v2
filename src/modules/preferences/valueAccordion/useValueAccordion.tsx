import { useState } from 'react';

export const useValueAccordion = () => {
  const [otherChecked, setOtherChecked] = useState(false);
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [letterCount, setletterCount] = useState(description.length);

  const handleChangeDesc = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setDescription(value);
    setletterCount(value.length);
    if (!value) {
      setError('required');
    } else if (value.length > 160) setError('Too long');
    else setError('');
  };

  return { otherChecked, setOtherChecked, description, setDescription, error, handleChangeDesc, letterCount };
};
