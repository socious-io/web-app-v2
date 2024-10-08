import i18next from 'i18next';
import detector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import { generateTranslationFile } from './locales/en/translation';
import { generateTranslationFile as generateJPTranslationFile } from './locales/jp/translation';

const resources = {
  en: {
    translation: generateTranslationFile(),
  },
  jp: {
    translation: generateJPTranslationFile(),
  },
};

i18next
  .use(detector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'jp',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });
