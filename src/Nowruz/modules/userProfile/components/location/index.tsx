import { Typography } from '@mui/material';
import React from 'react';
import { COUNTRIES_DICT } from 'src/constants/COUNTRIES';
import { Icon } from 'src/Nowruz/general/Icon';
import { CountryFlag } from 'src/Nowruz/modules/general/components/countryFlag';

export interface LocationProps {
  country?: string;
  city?: string;
  iconName?: string;
}
export const Location: React.FC<LocationProps> = (props) => {
  const { country, city, iconName } = props;
  function getCountryName(shortname?: keyof typeof COUNTRIES_DICT | undefined) {
    if (shortname && COUNTRIES_DICT[shortname]) {
      return COUNTRIES_DICT[shortname];
    } else {
      return shortname;
    }
  }

  const address = `${city}, ${getCountryName(country as keyof typeof COUNTRIES_DICT | undefined)}`;

  return (
    <div className="flex flex-col gap-2">
      <Typography variant="subtitle1" className="text-Gray-light-mode-600">
        Location
      </Typography>
      <div className="flex gap-2 items-center">
        {/* <CountryFlag countryCode={country || ''} /> */}
        <Icon fontSize={20} name="marker-pin-02" className="text-Gray-light-mode-700" />
        <Typography variant="h6" className="text-Gray-light-mode-700">
          {address}
        </Typography>
      </div>
    </div>
  );
};
