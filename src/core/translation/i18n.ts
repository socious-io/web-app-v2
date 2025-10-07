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

const savedLang = localStorage.getItem('lang');
const queryLang = new URLSearchParams(window.location.search).get('lang');
const browserLang = navigator.language.split('-')[0];
if (queryLang) {
  localStorage.setItem('lang', queryLang);
}

const language = queryLang || savedLang || browserLang || 'en';

i18next
  .use(detector)
  .use(initReactI18next)
  .init({
    resources,
    lng: language,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });
