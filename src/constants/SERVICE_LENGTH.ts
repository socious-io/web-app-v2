import { translate } from 'src/core/utils';

export const SERVICE_LENGTH = [
  { label: translate('service-length.less-than-a-day'), value: 'LESS_THAN_A_DAY' },
  { label: translate('service-length.1-3-days'), value: '1_3_DAYS' },
  { label: translate('service-length.1-week'), value: '1_WEEK' },
  { label: translate('service-length.2-weeks'), value: '2_WEEKS' },
  { label: translate('service-length.less-than-a-month'), value: 'LESS_THAN_A_MONTH' },
  { label: translate('service-length.1-3-months'), value: '1_3_MONTHS' },
  { label: translate('service-length.3-6-months'), value: '3_6_MONTHS' },
  { label: translate('service-length.more-than-6-months'), value: '6_MONTHS_OR_MORE' },
];

export const translateServiceLength = SERVICE_LENGTH.map(length => ({
  ...length,
  label: translate(`service-form.delivery-options.${length.value}`) || length.label,
}));
