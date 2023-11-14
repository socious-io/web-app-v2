import { Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import { StepsContext } from 'src/Nowruz/modules/Auth/containers/onboarding/Stepper';
import { Button } from 'src/Nowruz/modules/general/components/Button';

import css from './welcome.module.scss';
export const OpWelcome = () => {
  const { updateSelectedStep } = useContext(StepsContext);

  return (
    <div className="flex flex-col items-center max-w-md py-5 px-6">
      <div className={css.title}>Welcome to Socious</div>
      <div className={css.description}>Create your organization and start hiring</div>
      <img src="/images/welcome.svg" />
      <div className={css.subtitle}> Complete your profile to find impact jobs</div>
      <Button color="primary" block onClick={() => updateSelectedStep(1)}>
        Create your organization
      </Button>
    </div>
  );
};
