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
        <h1 className={css.title}>Welcome to Socious</h1>
        <h2 className={css.description}>
          You’re about to embark on a journey paved with opportunities to make a real impact. With Socious, turns your
          ambitions and dreams into real-world change.
        </h2>
        <img src="/images/welcome.svg" />
        <div className={css.subtitle}> Complete your profile to find impact jobs</div>
        <div className="fixed bottom-16 left-0 p-4 pb-0 w-full md:static md:p-0 md:mt-6 ">
          <Button color="primary" block onClick={() => updateSelectedStep(1)}>
            Complete your profile
          </Button>
        </div>
      </div>
    </div>
  );
};
