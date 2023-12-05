import { useState } from 'react';
import { useSelector } from 'react-redux';
import { User } from 'src/core/api';
import { RootState } from 'src/store';

export const useEditSummary = () => {
  const user = useSelector<RootState, User | undefined>((state) => {
    return state.profile.user;
  });
  const [summary, setSummary] = useState(user?.mission);
  const [error, setError] = useState('');
  const [letterCount, setLetterCount] = useState(user?.mission?.length);

  // ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (!value) {
      setError('required');
      setLetterCount(0);
    } else if (value.length < 2600) {
      setSummary(value);
      setError('');
      setLetterCount(value.length);
    } else setError('Too long');
  };

  return { summary, error, handleChange, letterCount };
};
