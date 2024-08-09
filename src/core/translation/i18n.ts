import i18next from 'i18next';
import detector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

import { generateTranslationFile } from './locales/translation';

const resources = {
  en: {
    translation: generateTranslationFile('en'),
  },
  jp: {
    translation: generateTranslationFile('jp'),
  },
  spa: {
    translation: generateTranslationFile('spa'),
  },
};

i18next
  .use(detector)
  .use(initReactI18next)
  .use(HttpBackend)
  .init({
    backend: { loadPath: '/src/core/translation/locales/{{lng}}/{{ns}}.json' },
    lng: 'jp',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });
