import { translate } from 'src/core/utils';

export const PROJECT_PAYMENT_MODE = [
  { label: 'Fiat', value: 'FIAT' },
  { label: 'Crypto', value: 'CRYPTO' },
];

export const translatePaymentMode = PROJECT_PAYMENT_MODE.map(length => ({
  ...length,
  label: translate(`pay-methods.${length.value}`) || length.label,
}));
