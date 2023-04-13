export const PROJECT_PAYMENT_SCHEME = [
  { label: 'Hourly', value: 'HOURLY' },
  { label: 'Fixed', value: 'FIXED' },
];

export const PROJECT_PAYMENT_SCHEME_DROPDOWN = [
  { title: 'Hourly', value: 'HOURLY' },
  { title: 'Fixed', value: 'FIXED' },
];

export function translatePaymentTerms(value: string) {
  const obj = PROJECT_PAYMENT_SCHEME.find((item) => item.value === value);
  if (obj) {
    return obj.label;
  }
  return '';
}
