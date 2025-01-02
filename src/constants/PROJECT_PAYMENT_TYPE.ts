import { translate } from 'src/core/utils';

export const PROJECT_PAYMENT_TYPE = [
  { label: translate('payment_type.volunteer'), value: 'VOLUNTEER' },
  { label: translate('payment_type.paid'), value: 'PAID' },
];

export const PROJECT_PAYMENT_TYPE_DROPDOWN = [
  { title: translate('payment_type.volunteer'), value: 'VOLUNTEER' },
  { title: translate('payment_type.paid'), value: 'PAID' },
];

export function translatePaymentType(value: string) {
  const obj = PROJECT_PAYMENT_TYPE.find(item => item.value === value);
  if (obj) {
    return obj.label;
  }
  return '';
}
