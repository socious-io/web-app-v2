import communitiesEN from './en/communities.json';
import connectEN from './en/connect.json';
import contractsEN from './en/contracts.json';
import dashboardEN from './en/dashboard.json';
import decentdisputeEN from './en/decentdispute.json';
import educationalcertificateEN from './en/educationalcertificate.json';
import impactEN from './en/impact.json';
import jobsEN from './en/jobs.json';
import languages from './en/languages.json';
import loginEN from './en/login.json';
import messagingEN from './en/messaging.json';
import navigationEN from './en/navigation.json';
import notificationsEN from './en/notifications.json';
import paymentsEN from './en/payments.json';
import profileEN from './en/profile.json';
import referralEN from './en/referral.json';
import reviewsEN from './en/reviews.json';
import searchbarEN from './en/searchbar.json';
import servicesEN from './en/services.json';
import settingsEN from './en/settings.json';
import skills from './en/skills.json';
import socialCauses from './en/socialCauses.json';
import workexperienceEN from './en/workexperience.json';
import communitiesJP from './jp/communities.json';
import connectJP from './jp/connect.json';
import contractsJP from './jp/contracts.json';
import dashboardJP from './jp/dashboard.json';
import decentdisputeJP from './jp/decentdispute.json';
import educationalcertificateJP from './jp/educationalcertificate.json';
import impactJP from './jp/impact.json';
import jobsJP from './jp/jobs.json';
import loginJP from './jp/login.json';
import messagingJP from './jp/messaging.json';
import navigationJP from './jp/navigation.json';
import notificationsJP from './jp/notifications.json';
import paymentsJP from './jp/payments.json';
import profileJP from './jp/profile.json';
import referralJP from './jp/referral.json';
import reviewsJP from './jp/reviews.json';
import searchbarJP from './jp/searchbar.json';
import servicesJP from './jp/services.json';
import settingsJP from './jp/settings.json';
import workexperienceJP from './jp/workexperience.json';
export function generateTranslationFile(theLang) {
  if (theLang == 'en') {
    return Object.assign(
      {},
      socialCauses,
      languages,
      communitiesEN,
      connectEN,
      contractsEN,
      dashboardEN,
      decentdisputeEN,
      educationalcertificateEN,
      impactEN,
      jobsEN,
      languagesEN,
      loginEN,
      messagingEN,
      navigationEN,
      notificationsEN,
      paymentsEN,
      profileEN,
      referralEN,
      reviewsEN,
      searchbarEN,
      servicesEN,
      settingsEN,
      skills,
      workexperienceEN,
    );
  }
  if (theLang == 'jp') {
    return Object.assign(
      {},
      communitiesJP,
      connectJP,
      dashboardJP,
      contractsJP,
      decentdisputeJP,
      educationalcertificateJP,
      impactJP,
      jobsJP,
      loginJP,
      messagingJP,
      navigationJP,
      notificationsJP,
      paymentsJP,
      profileJP,
      referralJP,
      reviewsJP,
      searchbarJP,
      servicesJP,
      settingsJP,
      workexperienceJP,
    );
  }
}
