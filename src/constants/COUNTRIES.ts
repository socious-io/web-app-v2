import { getAllISOCodes } from 'iso-country-currency';

export const COUNTRIES: { title: string; value: string }[] = getAllISOCodes().map((country) => {
  return {
    value: country.iso,
    title: country.countryName,
  };
});
