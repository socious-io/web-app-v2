import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Languages } from 'src/constants/constants';
import { LanguageProps } from 'src/Nowruz/modules/userProfile/containers/editInfo/editInfo.types';

interface OptionType {
  value: string;
  label: string;
}

export const useLanguageItem = (language: LanguageProps) => {
  const { t } = useTranslation();
  const mapToLanguage = (langCode: keyof typeof Languages | undefined) => {
    if (!langCode) return '';
    if (langCode && Languages[langCode]) {
      return Languages[langCode];
    } else {
      return langCode;
    }
  };

  const levels = ['BASIC', 'CONVERSANT', 'PROFICIENT', 'FLUENT', 'NATIVE'];
  const [name, setName] = useState<OptionType>({ value: language.name || '', label: mapToLanguage(language.name) });
  const [level, setLevel] = useState<OptionType>({
    value: language.level || '',
    label: t(language.level || ''),
  });
  const languageOptions = Object.entries(Languages).map((item) => {
    return { value: item[0], label: item[1] };
  });

  const levelOptions = levels.map((item) => {
    return { value: item, label: t(item) };
  });

  const onSelectLanguage = (lang: OptionType) => {
    setName({ value: lang.value, label: lang.label });
  };

  const onSelectLevel = (lvl: OptionType) => {
    setLevel(lvl);
  };
  return {
    name,
    level,
    setLevel,
    onSelectLanguage,
    onSelectLevel,
    languageOptions,
    levelOptions,
  };
};
