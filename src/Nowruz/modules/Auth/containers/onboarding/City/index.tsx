import { Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import { StepsContext } from 'src/Nowruz/modules/Auth/containers/onboarding/Stepper';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { SearchDropdown } from 'src/Nowruz/modules/general/components/SearchDropdown';
const options = [
  { label: 'New York', value: 'New York' },
  { label: 'Los Angeles', value: 'Los Angeles' },
  { label: 'Paris', value: 'Paris' },
  { label: 'Tokyo', value: 'Tokyo' },
  { label: 'London', value: 'London' },
  { label: 'Sydney', value: 'Sydney' },
  { label: 'Mumbai', value: 'Mumbai' },
  { label: 'Beijing', value: 'Beijing' },
  { label: 'Rio de Janeiro', value: 'Rio de Janeiro' },
  { label: 'Dubai', value: 'Dubai' },
  { label: 'Rome', value: 'Rome' },
  { label: 'Cairo', value: 'Cairo' },
  { label: 'Toronto', value: 'Toronto' },
  { label: 'Singapore', value: 'Singapore' },
  { label: 'Istanbul', value: 'Istanbul' },
  { label: 'San Francisco', value: 'San Francisco' },
  { label: 'Shanghai', value: 'Shanghai' },
  { label: 'Berlin', value: 'Berlin' },
  { label: 'Mexico City', value: 'Mexico City' },
  { label: 'Bangkok', value: 'Bangkok' },
];

export const City = () => {
  const { updateSelectedStep } = useContext(StepsContext);

  return (
    <>
      What are you passionated What are you passionated What are you passionated What are you passionated
      <SearchDropdown className="mt-6 mb-4" placeholder="Search for a city" options={options} label="Location*" />
      <Button color="primary" block onClick={() => updateSelectedStep(3)}>
        Continue
      </Button>
    </>
  );
};
