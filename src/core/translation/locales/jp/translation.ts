import companySize from './companySize.json';
import general from './general.json';
import intro from './intro.json';
import languages from './languages.json';
import login from './login.json';
import onboarding from './onboarding.json';
import organization from './organization.json';
import preferences from './preferences.json';
import signup from './signup.json';
import skills from './skills.json';
import socialCauses from './socialCauses.json';

export function generateTranslationFile() {
  return Object.assign(
    {},
    skills,
    socialCauses,
    languages,
    preferences,
    companySize,
    general,
    intro,
    login,
    onboarding,
    organization,
    signup,
  );
}
