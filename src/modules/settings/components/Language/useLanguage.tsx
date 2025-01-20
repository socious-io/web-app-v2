import i18next from 'i18next';
import { useState } from 'react';
import useSwitchLanguage from 'src/core/hooks/useSwitchLanguage';
import { translate } from 'src/core/utils';

export const useLanguage = () => {
  const { switchLanguage, selectedLanguage: initialLanguage } = useSwitchLanguage();
  const getLanguageOption = lang => {
    const languageMap = {
      en: { label: translate('setting-language-labels.en'), value: 'en' },
      jp: { label: translate('setting-language-labels.jp'), value: 'jp' },
    };

    return languageMap[lang] || { label: 'English (US)', value: 'en' };
  };

  const [unsSavedValue, setUnSavedValue] = useState(getLanguageOption(initialLanguage));

  const onSave = () => {
    switchLanguage(unsSavedValue.value);
  };

  // Reset the selected language to the last saved state
  const onCancel = () => {
    setUnSavedValue(unsSavedValue);
    i18next.changeLanguage(unsSavedValue.value);
  };

  return { onSave, onCancel, unsSavedValue, setUnSavedValue };
};
