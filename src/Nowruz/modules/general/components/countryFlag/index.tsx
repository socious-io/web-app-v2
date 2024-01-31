import * as Flags from 'country-flag-icons/react/1x1';
import React from 'react';

import css from './countryFlag.module.scss';

interface CountryFlagProps {
  countryCode: string;
}

export const CountryFlag: React.FC<CountryFlagProps> = ({ countryCode }) => {
  const FlagComponent = Flags[countryCode.toUpperCase() as keyof typeof Flags];
  return <FlagComponent className={`w-5 ${css.rounded}`} />;
};
