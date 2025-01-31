import certificates from './certificate.json';
import chats from './chats.json';
import companySize from './companySize.json';
import connections from './connections.json';
import constants from './constants.json';
import contracts from './contracts.json';
import contribute from './contribute.json';
import credential from './credential.json';
import dashboard from './dashboard.json';
import dispute from './disputes.json';
import feeds from './feeds.json';
import general from './general.json';
import header from './header.json';
import intro from './intro.json';
import jobs from './jobs.json';
import kyc from './kyc.json';
import languages from './languages.json';
import login from './login.json';
import navigation from './navigation.json';
import onboarding from './onboarding.json';
import organization from './organization.json';
import payments from './payments.json';
import preferences from './preferences.json';
import profile from './profile.json';
import referral from './referral.json';
import search from './search.json';
import services from './services.json';
import setting from './setting.json';
import signup from './signup.json';
import skills from './skills.json';
import socialCauses from './socialCauses.json';
import termsCondition from './termsCondition.json';
import userTeam from './userTeam.json';

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
    dashboard,
    kyc,
    profile,
    referral,
    navigation,
    header,
    jobs,
    contracts,
    dispute,
    feeds,
    connections,
    chats,
    payments,
    credential,
    services,
    setting,
    search,
    constants,
    termsCondition,
    userTeam,
    contribute,
    certificates,
  );
}
