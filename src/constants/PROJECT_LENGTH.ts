export const PROJECT_LENGTH = [
  { title: 'Less than a day', value: 'LESS_THAN_A_DAY' },
  { title: 'Less than a month', value: 'LESS_THAN_A_MONTH' },
  { title: '1-3 months', value: '1_3_MONTHS' },
  { title: '3-6 months', value: '3_6_MONTHS' },
  { title: 'More than 6 months', value: '6_MONTHS_OR_MORE' },
];

export const PROJECT_LENGTH_V2 = [
  { label: 'Less than a day', value: 'LESS_THAN_A_DAY' },
  { label: 'Less than a month', value: 'LESS_THAN_A_MONTH' },
  { label: '1-3 months', value: '1_3_MONTHS' },
  { label: '3-6 months', value: '3_6_MONTHS' },
  { label: 'More than 6 months', value: '6_MONTHS_OR_MORE' },
];

export function translateProjectLength(value: string) {
  const obj = PROJECT_LENGTH.find((item) => item.value === value);
  if (obj) {
    return obj.title;
  }
  console.warn('Could not translate project_length');
  return '';
}
