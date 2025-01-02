import { translate } from 'src/core/utils';

export const PROJECT_LENGTH = [
  { title: translate('project_length.less_than_a_day'), value: 'LESS_THAN_A_DAY' },
  { title: translate('project_length.less_than_a_month'), value: 'LESS_THAN_A_MONTH' },
  { title: translate('project_length.1_3_months'), value: '1_3_MONTHS' },
  { title: translate('project_length.3_6_months'), value: '3_6_MONTHS' },
  { title: translate('project_length.more_than_6_months'), value: '6_MONTHS_OR_MORE' },
];

export const PROJECT_LENGTH_V2 = [
  { label: translate('project_length.less_than_a_day'), value: 'LESS_THAN_A_DAY' },
  { label: translate('project_length.less_than_a_month'), value: 'LESS_THAN_A_MONTH' },
  { label: translate('project_length.1_3_months'), value: '1_3_MONTHS' },
  { label: translate('project_length.3_6_months'), value: '3_6_MONTHS' },
  { label: translate('project_length.more_than_6_months'), value: '6_MONTHS_OR_MORE' },
];

export const PROJECT_LENGTH_V3 = [
  { label: translate('project_length.less_than_1_day'), value: 'LESS_THAN_A_DAY' },
  { label: translate('project_length.less_than_1_month'), value: 'LESS_THAN_A_MONTH' },
  { label: translate('project_length.1_3_months'), value: '1_3_MONTHS' },
  { label: translate('project_length.3_6_months'), value: '3_6_MONTHS' },
  { label: translate('project_length.more_than_6_months'), value: '6_MONTHS_OR_MORE' },
];

export function translateProjectLength(value: string) {
  const obj = PROJECT_LENGTH.find(item => item.value === value);
  if (obj) {
    return obj.title;
  }
  console.warn('Could not translate project_length');
  return '';
}
