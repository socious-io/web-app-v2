import languages from './languages.json';
import skills from './skills.json';
import socialCauses from './socialCauses.json';

export function generateTranslationFile() {
  return Object.assign({}, skills, socialCauses, languages);
}
