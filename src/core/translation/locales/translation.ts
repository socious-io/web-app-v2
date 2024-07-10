import languages from './languages.json';
import skills from './skills.json';
import socialCauses from './socialCauses.json';

export function generateTranslationFile(theLanguage) {
  //return Object.assign({}, skills, socialCauses, languages);
  //return Object.assign({}, languages);
  const translationFile = {};
  const combinedTranslations = Object.assign({}, skills, languages, socialCauses);
  for (const key in combinedTranslations) {
    translationFile[key] = combinedTranslations[key][theLanguage];
  }
  return translationFile;
}
