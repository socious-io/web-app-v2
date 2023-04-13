import { DropdownItem } from './../components/atoms/dropdown-v2/dropdown.types';
import { getAllISOCodes } from 'iso-country-currency';

export const COUNTRIES: DropdownItem[] = getAllISOCodes().map((country) => {
  return {
    value: country.iso,
    label: country.countryName,
  };
});
