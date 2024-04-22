import { useState } from 'react';

export const useEmailInvitation = (emails: string[], setEmails: (val: string[]) => void) => {
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');

  const handleChangeInput = (value: string) => {
    setEmail(value);
    const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!!value && value.match(isValidEmail)) {
      setError('');
    } else {
      setError('invalid');
    }
  };

  const handleAddEmail = () => {
    if (error) return;
    const newEmail = email.replaceAll(/\s/g, '');
    if (emails.includes(newEmail)) return;
    setEmails([...emails, newEmail]);
    setEmail('');
  };

  const handleDeleteEmail = (deleted: string) => {
    const filtered = emails.filter((item) => item !== deleted);
    setEmails(filtered);
  };

  return { error, handleChangeInput, email, handleAddEmail, handleDeleteEmail };
};
