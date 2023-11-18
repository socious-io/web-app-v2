import { User01 } from 'public/icons/nowruz/user-01';
import variables from 'src/components/_exports.module.scss';
import { Icon } from 'src/Nowruz/general/Icon';

export const reviews = {
  user: {
    review:
      'Socious not only helped me secure my dream environmental job, but also boosted my salary and enabled me to make a positive impact.',
    name: 'Masaki Mashiko',
    position: 'Head of Sales, Climate Startup',
    image: '/images/review-avatar.png',
  },
  organization: {
    review:
      "Socious streamlined my startup's hiring process, saving time and money while finding skilled, passionate candidates.",
    name: 'Sean Park',
    position: 'Co-Founder and CEO, Energy X',
    image: '/images/org-reviewer.png',
  },
};

export const onboardingOptons = [
  {
    title: 'I am seeking impact work',
    description: 'Discover roles that matter and join forces with changemakers',
    icon: { name: 'user-01', fontSize: 21 },

    value: 'user',
  },
  {
    title: 'I am hiring purpose-driven talent',
    description: 'List opportunities and connect with talent who share your mission',
    icon: { name: 'building-05', fontSize: 21 },
    value: 'organization',
  },
];
