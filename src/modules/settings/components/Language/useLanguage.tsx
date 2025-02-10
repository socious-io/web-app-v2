import i18next from 'i18next';
import { useState } from 'react';
import { supportedLanguages } from 'src/constants/constants';
import useSwitchLanguage from 'src/core/hooks/useSwitchLanguage';
import { translate } from 'src/core/utils';

export const useLanguage = () => {
  const { switchLanguage, selectedLanguage: initialLanguage } = useSwitchLanguage();
  const getLanguageOption = lang => {
    const languageMap = supportedLanguages.reduce((map, { value, label }) => {
      map[value] = { label, value };
      return map;
    }, {});
    return languageMap[lang] || { label: 'English (US)', value: 'en' };
  };

  const [unsavedValue, setUnsavedValue] = useState(getLanguageOption(initialLanguage));

  const onSave = () => {
    switchLanguage(unsavedValue.value);
  };

  // Reset the selected language to the last saved state
  const onCancel = () => {
    setUnsavedValue(unsavedValue);
    i18next.changeLanguage(unsavedValue.value);
  };

  return { onSave, onCancel, unsavedValue, setUnsavedValue };
};
