import i18next from 'i18next';

export const reviews = {
  user: {
    review: i18next.t('intro-user-review'),
    name: i18next.t('intro-user-name'),
    position: i18next.t('intro-user-title'),
    image: '/images/review-avatar.png',
  },
  organization: {
    review: i18next.t('intro-org-review'),
    name: i18next.t('intro-org-name'),
    position: i18next.t('intro-org-position'),
    image: '/images/org-reviewer.png',
  },
};

export const onboardingOptons = [
  {
    title: i18next.t('intro-user-option-title'),
    description: i18next.t('intro-user-option-desc'),
    icon: { name: 'user-01', fontSize: 21 },
    value: 'user',
  },
  {
    title: i18next.t('intro-org-option-title'),
    description: i18next.t('intro-org-option-desc'),
    icon: { name: 'building-05', fontSize: 21 },
    value: 'organization',
  },
];
