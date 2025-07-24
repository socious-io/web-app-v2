import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { supportedLanguages } from 'src/constants/constants';

const useSwitchLanguage = (defaultLanguage = 'en') => {
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language || defaultLanguage);

  const switchLanguage = language => {
    if (supportedLanguages.map(lang => lang.value).includes(language)) {
      setSelectedLanguage(language);
      i18n.changeLanguage(language);
      localStorage.setItem('lang', language);
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
