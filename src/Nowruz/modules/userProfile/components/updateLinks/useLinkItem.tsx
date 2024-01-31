import { useState } from 'react';

export const useLinkItem = () => {
  const [titleError, setTitleError] = useState('');
  const [urlError, setUrlError] = useState('');
  const [title, setTitle] = useState('');
  const [url, seturl] = useState('');

  return { titleError, urlError, title, url };
};
