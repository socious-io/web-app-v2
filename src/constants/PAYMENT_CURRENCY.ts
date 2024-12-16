import { getAllISOCodes } from 'iso-country-currency';

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

export const CURRENCIES = getAllISOCodes()
  .map(item => item.currency)
  .filter(onlyUnique)
  .map(item => ({ title: item, value: item }));

export const CURRENCY_SIGNS = {
  USD: '$',
  JPY: '¥',
  DAI: 'Ξ',
  Flint: '⨎',
  mUSDC: 'm$',
  SC: '∫',
  USDC: '$',
  USDT: '$',
  WADA: '₳',
};
