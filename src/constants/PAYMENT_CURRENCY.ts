import { getAllISOCodes } from 'iso-country-currency';

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

export const CURRENCIES = getAllISOCodes()
  .map((item) => item.currency)
  .filter(onlyUnique)
  .map((item) => ({ title: item, value: item }));
