import { useState } from 'react';
import { Languages } from 'src/constants/constants';
import { Language } from 'src/core/api';

interface OptionType {
  value: string;
  label: string;
}

export const useLanguageItem = (language: Language) => {
  const mapToLanguage = (langCode: keyof typeof Languages) => {
    if (langCode && Languages[langCode]) {
      return Languages[langCode];
    } else {
      return langCode;
    }
  };

  function capitalizeFirstLetter(value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }

  const levels = ['BASIC', 'CONVERSANT', 'PROFICIENT', 'FLUENT', 'NATIVE'];
  const [name, setName] = useState<OptionType>({ value: language.name, label: mapToLanguage(language.name) });
  const [level, setLevel] = useState<OptionType>({
    value: language.level,
    label: capitalizeFirstLetter(language.level),
  });
  const languageOptions = Object.entries(Languages).map((item) => {
    return { value: item[0], label: item[1] };
  });

  const levelOptions = levels.map((item) => {
    return { value: item, label: capitalizeFirstLetter(item) };
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
