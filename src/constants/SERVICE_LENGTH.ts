import { translate } from 'src/core/utils';

export const SERVICE_LENGTH = [
  { label: 'Less than a day', value: 'LESS_THAN_A_DAY' },
  { label: '1-3 days', value: '1_3_DAYS' },
  { label: '1 week', value: '1_WEEK' },
  { label: '2 weeks', value: '2_WEEKS' },
  { label: 'Less than a month', value: 'LESS_THAN_A_MONTH' },
  { label: '1-3 months', value: '1_3_MONTHS' },
  { label: '3-6 months', value: '3_6_MONTHS' },
  { label: 'More than 6 months', value: '6_MONTHS_OR_MORE' },
];

export const translateServiceLength = SERVICE_LENGTH.map(length => ({
  ...length,
  label: translate(`service-form.delivery-options.${length.value}`) || length.label,
}));
