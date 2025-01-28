import i18next from 'i18next';
import { useState } from 'react';
import { supportedLanguages } from 'src/constants/constants';

const useSwitchLanguage = (defaultLanguage = 'en') => {
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    return localStorage.getItem('language') || defaultLanguage;
  });

  const switchLanguage = language => {
    if (supportedLanguages.map(lang => lang.value).includes(language)) {
      setSelectedLanguage(language);
      i18next.changeLanguage(language);
      localStorage.setItem('language', language);
      window.location.reload();
    } else {
      console.warn(`Language '${language}' is not supported.`);
    }
  };
  return {
    selectedLanguage,
    switchLanguage,
  };
};

export default useSwitchLanguage;
