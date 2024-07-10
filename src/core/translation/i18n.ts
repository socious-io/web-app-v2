import i18next from 'i18next';
import detector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import { generateTranslationFile } from './locales/translation';

const resources = {
  en: {
    translation: generateTranslationFile('en'),
  },
  jp: {
    translation: generateTranslationFile('jp'),
  },
};

i18next
  .use(detector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });
