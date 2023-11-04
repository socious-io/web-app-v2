import { Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import { StepsContext } from 'src/Nowruz/modules/Auth/containers/onboarding/Stepper';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { SearchDropdown } from 'src/Nowruz/modules/general/components/SearchDropdown';
const options = [
  { label: 'Cherry', value: 'cherry', avatar: 'https://mui.com/static/images/avatar/1.jpg', subtitle: '@unigina123' },
  { label: 'Grape', value: 'grape', avatar: 'https://mui.com/static/images/avatar/1.jpg', subtitle: '@unigina123' },
  { label: 'Lemon', value: 'lemon', avatar: 'https://mui.com/static/images/avatar/1.jpg', subtitle: '@unigina123' },
  { label: 'Orange', value: 'orange', avatar: 'https://mui.com/static/images/avatar/1.jpg', subtitle: '@unigina123' },
  { label: 'Apple', value: 'apple', avatar: 'https://mui.com/static/images/avatar/1.jpg', subtitle: '@unigina123' },
  { label: 'Pear', value: 'pear', avatar: 'https://mui.com/static/images/avatar/1.jpg', subtitle: '@unigina123' },
  { label: 'Strawberry', value: 'strawberry', avatar: 'https://mui.com/static/images/avatar/1.jpg' },
  { label: 'Watermelon', value: 'watermelon' },
  { label: 'Kiwi', value: 'kiwi' },
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
