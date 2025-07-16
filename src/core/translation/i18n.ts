import i18next from 'i18next';
import detector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import { generateTranslationFile } from './locales/en/translation';
import { generateTranslationFile as generateESTranslationFile } from './locales/es/translation';
import { generateTranslationFile as generateJPTranslationFile } from './locales/jp/translation';
import { generateTranslationFile as generateKRTranslationFile } from './locales/kr/translation';

const resources = {
  en: {
    translation: generateTranslationFile(),
  },
  ja: {
    translation: generateJPTranslationFile(),
  },
  es: {
    translation: generateESTranslationFile(),
  },
  ko: {
    translation: generateKRTranslationFile(),
  },
};

i18next
  .use(detector)
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('i18nextLng') || navigator.language || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });
