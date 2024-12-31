import i18next from 'i18next';
import { useState } from 'react';
import { translate } from 'src/core/utils';

export const useLanguage = () => {
  const initialLanguage = localStorage.getItem('language') || 'en';

  const getLanguageOption = lang => {
    const languageMap = {
      en: { label: translate('setting-language-labels.en'), value: 'en' },
      jp: { label: translate('setting-language-labels.jp'), value: 'jp' },
    };

    return languageMap[lang] || { label: 'English (US)', value: 'en' };
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
    setSelectedLanguage(initialState);
    i18next.changeLanguage(initialState.value);
  };

  return { onSave, onCancel, selectedLanguage, setSelectedLanguage };
};
