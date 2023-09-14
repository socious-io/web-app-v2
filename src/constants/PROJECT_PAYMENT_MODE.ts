export const PROJECT_PAYMENT_MODE = [
  { label: 'Crypto', value: 'CRYPTO' },
  { label: 'Fiat', value: 'FIAT' },
];

export function translatePaymentMode(value: string) {
  const obj = PROJECT_PAYMENT_MODE.find((item) => item.value === value);
  if (obj) {
    return obj.label;
  }
  return '';
}
