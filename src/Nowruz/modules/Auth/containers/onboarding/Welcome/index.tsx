import { Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import { StepsContext } from 'src/Nowruz/modules/Auth/containers/onboarding/Stepper';
import { Button } from 'src/Nowruz/modules/general/components/Button';

import css from './welcome.module.scss';
export const Welcome = () => {
  const { updateSelectedStep } = useContext(StepsContext);

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center max-w-md py-5 px-4">
        <Typography variant="body1" align="center" mb={4}>
          Welcome to Socious
        </Typography>
        <Typography variant="h5" align="center" className={css.subtitle} mb={5}>
          You’re about to embark on a journey paved with opportunities to make a real impact. With Socious, turns your
          ambitions and dreams into real-world change.
        </Typography>
        <img src="/images/welcome.svg" />
        <Typography variant="h5" align="center" className={css.subtitle} mb={6}>
          Complete your profile to find impact jobs
        </Typography>
        <Button color="primary" block onClick={() => updateSelectedStep(1)}>
          Continue
        </Button>
      </div>
    </div>
  );
};
