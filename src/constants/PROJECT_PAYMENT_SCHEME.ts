import { translate } from 'src/core/utils';

export const PROJECT_PAYMENT_SCHEME = [
  { label: translate('payment_scheme.hourly'), value: 'HOURLY' },
  { label: translate('payment_scheme.fixed'), value: 'FIXED' },
];

export const PROJECT_PAYMENT_SCHEME_DROPDOWN = [
  { title: translate('payment_scheme.hourly'), value: 'HOURLY' },
  { title: translate('payment_scheme.fixed'), value: 'FIXED' },
];

export function translatePaymentTerms(value: string) {
  const obj = PROJECT_PAYMENT_SCHEME.find(item => item.value === value);
  if (obj) {
    return obj.label;
  }
  return '';
}
