import i18next from 'i18next';
import { useState } from 'react';

export const useLanguage = () => {
  const initialLanguage = localStorage.getItem('language') || 'en';

  const getLanguageOption = lang => {
    if (lang === 'en') return { label: 'English (US)', value: 'en' };
    if (lang === 'jp') return { label: 'Japanese', value: 'jp' };
    return { label: 'English (US)', value: 'en' };
  };

  const [selectedLanguage, setSelectedLanguage] = useState(getLanguageOption(initialLanguage));

  // Save the initial state
  const [initialState, setInitialState] = useState(getLanguageOption(initialLanguage));

  const onSave = () => {
    i18next.changeLanguage(selectedLanguage.value);
    localStorage.setItem('language', selectedLanguage.value);
    setInitialState(selectedLanguage);
  };

  // Reset the selected language to the last saved state
  const onCancel = () => {
    console.log('initialState', initialState);
    setSelectedLanguage(initialState);
    i18next.changeLanguage(initialState.value);
  };

  return { onSave, onCancel, selectedLanguage, setSelectedLanguage };
};
