export const PROJECT_PAYMENT_TYPE = [
  { label: 'Volunteer', value: 'VOLUNTEER' },
  { label: 'Paid', value: 'PAID' },
];

export function translatePaymentType(value: string) {
  const obj = PROJECT_PAYMENT_TYPE.find((item) => item.value === value);
  if (obj) {
    return obj.label;
  }
  return '';
}
